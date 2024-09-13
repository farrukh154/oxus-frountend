<template>
  <div class="ma-5">
    <dynamic-data-table
      tableTitle=""
      modelName="helpdesks"
      :can-export="true"
      :columns="[
        {name: 'name',label: $t('dynamictable.name')},
        {name: 'status.uid', label:  $t('dynamictable.status')},
        {name: 'priority.uid', label: $t('dynamictable.priority')},
        {name: 'branch.description', label:  $t('dynamictable.branch')},
        {name: 'created', label:  $t('dynamictable.created')},
        {name: 'updated', label:  $t('dynamictable.updated')},
        {name: 'created_by.get_full_name', label:  $t('dynamictable.createdby')},
        {name: 'updated_by.get_full_name', label:  $t('dynamictable.updatedby')},
        {name: 'for_whom.get_full_name', label:  $t('dynamictable.forwhom')},
        {name: 'description', label:  $t('dynamictable.description')},
      ]"
      :show-columns="[
        'name',
        'status.uid',
        'priority.uid',
        'branch.description',
        'created',
        'updated',
        'created_by.get_full_name',
        'updated_by.get_full_name',
        'for_whom.get_full_name',
        'description',
      ]"
      :can-create="false"
      :can-update="false"
      :can-delete="true"
      :selectable="true"
      ref="refreshTable"
    >
      <template v-slot:servicePanel>
        <v-btn @click="edit('add')" size="small" color="green" :append-icon="mdiPlusCircle" class="mr-2">
          {{ $t('dynamictable.addButton') }}
        </v-btn>
      </template>
      <template v-slot:actions="{item}">
        <v-btn @click="edit('edit', item.id)" size="small" color="primary" :append-icon="mdiFileEdit">{{ $t('dynamictable.changeButton') }}  </v-btn>
      </template>
    </dynamic-data-table>

    <helpdeskEdit @saved="refreshTable.refreshData()" :headline="headline" ref="isFormVisible" />
  </div>
</template>

<script setup>
import helpdeskEdit from '~/components/helpdesk/helpdeskCard.vue'
import {mdiPlusCircle, mdiFileEdit} from '@mdi/js'
import DynamicDataTable from '~/components/dynamic_table/dynamic-data-table.vue'

const isFormVisible = ref()
const headline = ref()

const refreshTable = ref()

const openForm = (id) => {
  isFormVisible.value.openDialog(id)
}

const edit = (choose, id) => {
  if (choose === 'add') {
    headline.value = 'Добавить'
    openForm()
  } else {
    headline.value = 'Изменить'
    if (id) {
      openForm(id)
    }
  }
}
</script>
