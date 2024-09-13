<template>
  <template v-if="headersRef.length <= 0">
    <p class="text-center">
      <template v-if="loadingRef"> Загрузка. Пожалуйста, подождите </template>
      <template v-else> Ошибка при загрузке таблицы </template>
    </p>
  </template>
  <template v-else>
    <v-data-table-server
      :items="itemsRef"
      :headers="headersRef.filter((header) => header.visible)"
      :server-items-length="totalItemsRef"
      :items-length="totalItemsRef"
      :total-items="totalItemsRef"
      :loading="loadingRef"
      class="table fixed-header elevation-2"
      :hover="true"
      density="compact"
      :show-select="selectable"
      v-model="selectedRef"
      @update:page="pageNumberUpdated"
      @update:items-per-page="itemsPerPageCountUpdated"
      @update:sort-by="itemsSortUpdated"
      :items-per-page="pagination.itemsPerPage"
      v-model:items-per-page="pagination.itemsPerPage"
      :options.sync="pagination"
      :footer-props="{
        'items-per-page-options': itemsPerPageOptions,
        'items-per-page-text': 'Items per page',
      }"
      :items-per-page-options="itemsPerPageOptions"
    >
      <template v-slot:top>
        <div class="pa-2">
          <span class="text-h5">
            {{ tableTitle }}
          </span>
          <div class="float-right">
            <slot name="servicePanel"></slot>
            <v-btn size="small" @click="refreshData" class="mr-2" :append-icon="mdiRefreshCircle" color="primary">
              {{ $t('dynamictable.updateButton') }}
            </v-btn>
            <v-btn
              v-if="canExport"
              size="small"
              @click="exportData"
              class="mr-2"
              :append-icon="mdiFileExport"
              color="primary"
            >
            {{ $t('dynamictable.exportButton') }}
            </v-btn>
            <v-btn size="small" @click="toggleFilters" :append-icon="mdiFilter" class="mr-2" color="primary">
              {{ $t('dynamictable.filterButton') }}
            </v-btn>
            <v-btn @click="customizeTable" size="small" class="mr-2" :append-icon="mdiCog" color="primary">
              {{ $t('dynamictable.settingsButton') }}
            </v-btn>
            <v-btn
              v-if="canCreate && can(`${modelName}`, 'add')"
              size="small"
              @click="editRecord(null)"
              class="mr-2"
              :append-icon="mdiPlus"
              color="success"
            >
              Добавить
            </v-btn>
            <v-btn
              v-if="canDelete && can(`${modelName}`, 'delete')"
              :disabled="!selectedRef.length"
              size="small"
              @click="deleteRecord"
              class="mr-2"
              :append-icon="mdiDelete"
              color="error"
            >
            {{ $t('dynamictable.deleteButton') }}
            </v-btn>
          </div>
        </div>
      </template>

      <template v-slot:colgroup>
        <tr v-if="showFilters">
          <td v-if="selectable"></td>
          <td v-for="header in headersRef.filter((header) => header.visible)">
            <div v-if="header.type !== 'actions'">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="columnFilters[header.key]"
                    density="compact"
                    :label="`Фильтр ${header.title}`"
                    clearable
                    hide-details
                    class="mt-2"
                    variant="outlined"
                    @keyup.enter="fetchData"
                  />
                </v-col>
              </v-row>
            </div>
          </td>
        </tr>
      </template>

      <template v-for="header in headersRef.filter((header) => header.visible)" v-slot:[`item.${header.key}`]="{ item }">
        <div @dblclick="rowDblClicked(item)">
          <span v-if="header.type === 'boolean'">
            {{ item[header.key] ? 'Да' : 'Нет' }}
          </span>
          <span v-else-if="header.type === 'choice'">
            {{ header.choices.find((choice: { value: any }) => choice.value === item[header.key])?.display_name }}
          </span>
          <span v-else-if="header.type === 'date' || header.type === 'datetime'">
            {{ getDateFromISOString(item[header.key]) }}
          </span>
          <span v-else-if="header.type === 'file upload'">
            <a :href="item[header.key]" target="_blank" style="text-decoration: none">
              {{ getFileName(item[header.key]) }}
            </a>
          </span>
          <span
            v-else-if="header.key === 'id' && canUpdate && can(`${modelName}`, 'change')"
            class="text-blue"
            style="cursor: pointer"
            @click="editRecord(item.id)"
          >
            {{ item[header.key] }}
          </span>
          <span v-else-if="header.type === 'actions'"> <slot name="actions" :item="item" /> </span>
          <span v-else>
            <div class="items_hover">{{ item[header.key] }}</div>
          </span>
        </div>
      </template>
    </v-data-table-server>
  </template>

  <customize-modal
    :dialog="customizeDialog"
    :modelName="modelName"
    :headersRef="headersRef"
    @update:dialog="(value) => (customizeDialog = value)"
    @update:customized="orderCustomized"
  />
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import TableConfigService from './table-config-service'
import {DynamicTableService} from './dynamic-table-service'
import type {SortOption} from './dynamic-table-service'
import CustomizeModal from '~/components/dynamic_table/customize-modal.vue'
import {mdiFileExport, mdiRefreshCircle, mdiCog, mdiPlus, mdiDelete, mdiFilter} from '@mdi/js'
import {getFileName} from '~/common/file-utils'
import {can} from '~/common/ability'
import {confirmDialog} from '~/utils/confirm-dialog'
import {getColumnLabel, getColumnInfo} from './common'
import {mergeRelatedModels} from './helpers'
import {getDateFromISOString} from '~/common/date-conversion'
import {addNewContext} from '~/workspace/workspace'

const emit = defineEmits(['update:selected', 'update:dialog'])

const props = defineProps({
  tableTitle: String,
  modelName: {
    type: String,
    required: true,
  },
  canExport: Boolean,
  columns: {
    type: Array<any>,
    default: () => [],
  },
  showColumns: {
    type: Array<string>,
    default: () => [],
  },
  externalFilter: {
    type: String,
    default: '',
  },
  canCreate: {
    type: Boolean,
    default: true,
  },
  canUpdate: {
    type: Boolean,
    default: true,
  },
  canDelete: {
    type: Boolean,
    default: true,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  context: {
    type: Object,
    required: false,
  },
})

const slots = useSlots()

const itemsPerPageOptions = [
  {value: 10, title: '10'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
  {value: 100, title: '100'},
]
const itemsPerPage = ref(10)
const pagination = ref({
  page: 1,
  itemsPerPage: itemsPerPage,
  sortBy: 'id',
  sortOrder: 'desc',
})

const totalItemsRef = ref(0)
const itemsRef = ref([])
const loadingRef = ref(false)
const headersRef = ref([])
const columnFilters = ref({})
const showFilters = ref(false)

const modelOptions = ref('')

const customizeDialog = ref(false)

const selectedRef = ref([])

const dynamicTableService = new DynamicTableService()

const customizeTable = () => {
  customizeDialog.value = true
}

const orderCustomized = () => {
  loadTableConfig()
}

const rowDblClicked = (item: any) => {
  if (props.context) {
    props.context.closeContext(item)
  }
}

/**
 * Pagination and sorting
 */
const resetPagination = () => {
  pagination.value = {
    page: 1,
    itemsPerPage: itemsPerPage.value,
    sortBy: 'id',
    sortOrder: 'desc',
  }
}
const pageNumberUpdated = (page: number) => {
  pagination.value.page = page
  fetchData()
}
const itemsPerPageCountUpdated = (count: number) => {
  pagination.value.itemsPerPage = count
  pagination.value.page = 1
  fetchData()
}
const itemsSortUpdated = (sortBy?: SortOption[]) => {
  if (sortBy === undefined || sortBy.length === 0) {
    pagination.value.sortBy = 'id'
    pagination.value.sortOrder = 'desc'
    return
  }
  pagination.value.sortBy = sortBy[0].key
  pagination.value.sortOrder = sortBy[0].order
  fetchData()
}

const toggleFilters = () => {
  if (showFilters.value) {
    columnFilters.value = {}
    fetchData()
  }
  showFilters.value = !showFilters.value
}

const exportData = async () => {
  return // @todo not implemented
}

// deleting
const deleteRecord = async () => {
  confirmDialog({
    title: 'Удаления',
    body: `Вы дейстительно хотите удалить ${selectedRef.value.length} записей?`,
    cancelButtonText: 'Нет',
    confirmButtonText: 'Да',
    onCancel: () => {},
    onConfirm: async () => {
      await dynamicTableService.deleteItemsFromServer(selectedRef.value, props.modelName)
      selectedRef.value = []
      refreshData()
    },
  })
}

// editing
const editRecord = (id: any) => {
  const dComponent = {
    name: 'EditCard', 
    apiModel: props.modelName, 
    primaryKeyValue: id, 
    verboseName: modelOptions.value.verboseName,
  }

  dComponent.onContextClose = () => {
    refreshData()
  }
  addNewContext(dComponent)
}

const refreshData = () => {
  fetchData()
}

const loadMeta = async () => {
  loadingRef.value = true

  let tempHeaders: any[] = []

  tempHeaders.push({
    key: 'id',
    title: 'ID',
    type: 'number',
    visible: true,
    align: 'end',
  })

  if (slots.actions) {
    tempHeaders.push({
      key: 'actions',
      title: 'Actions',
      type: 'actions',
      visible: true,
      sortable: false,
    })
  }

  for (const c of props.columns) {
    if (c.name === 'id') {
      continue
    }
    let header = {
      title: c.label || (await getColumnLabel(c.name, props.modelName)),
      key: c.name,
      type: await getColumnInfo(c.name, props.modelName, 'type'),
      choices: await getColumnInfo(c.name, props.modelName, 'choices'),
      visible: props.showColumns.includes(c.name),
    }
    tempHeaders.push(header)
  }

  headersRef.value = tempHeaders
  resetPagination()
  await fetchData()

  loadingRef.value = false
}

const loadTableConfig = () => {
  const storedConfig = TableConfigService.getTableConfig(props.modelName)
  if (storedConfig) {
    headersRef.value = storedConfig.headers
    fetchData()
  } else {
    loadMeta()
  }
}

const fetchData = async () => {
  loadingRef.value = true

  const res = await dynamicTableService.getData({
    modelName: props.modelName,
    page: pagination.value.page,
    perPage: pagination.value.itemsPerPage,
    sortBy: pagination.value.sortBy,
    sortDir: pagination.value.sortOrder,
    filters: columnFilters.value,
    externalFilters: props.externalFilter,
    columns: props.columns,
  })

  itemsRef.value = await mergeRelatedModels(res.mainModels, res.relatedModels, props.columns, props.modelName)
  totalItemsRef.value = res.meta.total_results
  loadingRef.value = false
  modelOptions.value = await dynamicTableService.getModelOptions(props.modelName)
}

loadTableConfig()
defineExpose({refreshData, totalItemsRef})
</script>

<style>
.list-group .list-group-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: move;
}
.list-group .list-group-item span {
  display: inline-block;
  width: 85%;
}
.list-group .list-group-item .switch {
  display: inline-block;
  max-width: 80px;
  width: 15%;
  max-height: 50px;
  float: right;
}

.table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.fixed-header th {
  position: sticky;
  top: 0;
  background-color: #65b741;
  z-index: 2;
  color: white;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
.items_hover:hover {
  color: #65b741;
  cursor: pointer;
}
</style>
~/components/dynamic_table/table-config-service~/components/dynamic_table/dynamic-table-service~/components/dynamic_table/dynamic-table-service
