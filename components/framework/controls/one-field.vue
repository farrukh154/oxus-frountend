<template>
  <v-row>
    <v-col>
      <v-autocomplete
        v-model="value"
        :items="itemsFiltered"
        :item-title="targetField"
        :disabled="field.read_only"
        :label="field.label"
        item-value="id"
        @update:search="search"
        variant="outlined"
        clearable
      />
    </v-col>

    <v-col class="mt-3 ml--2" cols="auto">
      <v-btn
        v-if="!props.field.loadAll"
        color="success"
        :icon="mdiTableCheck"
        :disabled="field.read_only"
        class="mr-2"
        size="35"
        @click="selectFromTable"
        v-tooltip:bottom="'Выбор значения из таблицы'"
      />
      <v-btn
        v-if="!props.field.disableOpenCard"
        color="primary"
        :icon="mdiCheckbookArrowRight"
        :disabled="!value"
        size="35"
        @click="navigateToCard(value)"
        v-tooltip:bottom="'Переход в карточку'"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import {mdiTableCheck, mdiCheckbookArrowRight} from '@mdi/js'
import ApiFactory from '~/factories/api-factory'
import {getModelLink} from '~/common/domain-model'
import {settings} from '~/common/settings'
import {addNewContext} from '~/workspace/workspace'

const props = defineProps({
  modelValue: {},
  parentFilterName: {
    type: String,
    default: '',
  },
  parentFilterId: {
    type: [Number, Boolean],
    default: 0,
  },
  field: {
    type: Object,
    required: true,
  },
})

const settingsMap = settings()
const targetField = settingsMap.has(props.field.related_to)
  ? settingsMap.get(props.field.related_to).targetField
  : 'name'

const items = ref([])
const emit = defineEmits(['update:modelValue'])
const url = ref('')
const resourceNames = ref('')
const verboseName = ref('')
const verboseNamePlural = ref('')
const apiClient = ApiFactory.build()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

onMounted(async () => {
  const [link, prop] = await getModelLink(props.field.related_to)
  url.value = link
  resourceNames.value = prop.resource_name_plural
  verboseName.value = prop.verbose_name
  verboseNamePlural.value = prop.verbose_name_plural
  loadValue()
})

async function loadValue() {
  if (props.field.loadAll) {
    const res = await apiClient.get(url.value)
    items.value = await res[resourceNames.value]
  } else if (props.modelValue) {
    const res = await apiClient.get(`${url.value}?filter{id}=${value.value}`)
    items.value = await res[resourceNames.value]
  }
}

async function search(value) {
  if (value && !props.field.loadAll) {
    const res = await apiClient.get(`${url.value}?filter{${targetField}.icontains}=${value}`)
    items.value = await res[resourceNames.value]
  }
}

const itemsFiltered = computed(() => {
  if (!props.field.parentFilterName) {
    return items.value
  }
  return items.value.filter((i) => i[props.field.parentFilterName] === props.field.parentFilterId)
})

function selectFromTable() {
  const ctx = {
    name: 'SmartTable',
    apiModel: props.field.related_to,
    verboseName: verboseNamePlural.value,
    onContextClose: async (payload) => {
      if (payload?.id) {
        value.value = payload.id
        await loadValue()
      }
    },
  }
  addNewContext(ctx)
}

function navigateToCard(id) {
  addNewContext({
    name: 'EditCard',
    apiModel: props.field.related_to,
    primaryKeyValue: id,
    verboseName: verboseName.value,
  })
}

watch(
  () => value.value,
  (curr, prev) => {
    if (!props.field.loadAll) {
      loadValue()
    }
  },
)
</script>
