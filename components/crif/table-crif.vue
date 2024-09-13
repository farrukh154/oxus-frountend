<template>
  <dynamic-data-table
    tableTitle=""
    modelName="crifs"
    :can-export="true"
    :columns="[
      {name: 'created', label: 'Created'},
      {name: 'generated_by.get_full_name', label: 'CreatedBy'},
      {name: 'crif_credit_id', label: 'CRIF credit id'},
      {name: 'request_credit', label: 'Swift loan id'},
      {name: 'abacus_customer_id', label: 'Abacus client id'},
      {name: 'abacus_credit_id', label: 'Abacus credit id'},
      {name: 'abacus_account_number', label: 'Abacus account number'},
      {name: 'type.name', label: 'Type'},
      {name: 'parent', label: 'Parent'},
    ]"
    :show-columns="[
      'created',
      'generated_by.get_full_name',
      'crif_credit_id',
      'request_credit',
      'abacus_customer_id',
      'abacus_credit_id',
      'abacus_account_number',
      'type.name',
      'parent',
    ]"
    :can-create="false"
    :can-update="false"
    :can-delete="false"
    :selectable="false"
    :external-filter="`filter{request_credit}=${primaryKeyValue}`"
    ref="refreshTable"
  >
    <template v-slot:servicePanel>
      <v-btn color="primary" size="small" class="mr-2" :loading="loading" @click="confirmDialogCibt">
        Проверить в КИБТ
      </v-btn>
    </template>
    <template v-if="can('crifs', 'can-crif-generate-client-report')" v-slot:actions="{item}">
      <v-btn size="small" color="success" @click="print(item.id)">Open</v-btn>
    </template>
  </dynamic-data-table>
</template>

<script setup>
import {toastSuccess} from '../utils/toast'
import {confirmDialog} from '../utils/confirm-dialog'
import {can} from '~/common/ability'
import DynamicDataTable from '~/components/dynamic_table/dynamic-data-table.vue'
import ApiFactory from '~/factories/api-factory'

const loading = ref(false)
const apiClient = ApiFactory.build()

const props = defineProps({
  primaryKeyValue: Number,
})

const refreshTable = ref()

async function dialogCheckCibt() {
  try {
    loading.value = true
    await checkCrif()
    refreshTable.value.refreshData()
    toastSuccess('Данные успешно обновлены!')
  } finally {
    loading.value = false
  }
}

async function confirmDialogCibt() {
  if (refreshTable.value.totalItemsRef === 0) {
    dialogCheckCibt()
    return
  }
  confirmDialog({
    body: 'Уже есть проверка в КИБТ, действительно проверить заново?',
    cancelButtonText: 'Нет',
    confirmButtonText: 'Да',
    onConfirm: async () => await dialogCheckCibt(),
  })
}

async function checkCrif() {
  await apiClient.post('/crif-swift-check/', {swiftId: props.primaryKeyValue})
}

async function print(id) {
  const config = useRuntimeConfig()
  const anchor = document.createElement('a')
  anchor.href = `${config.public.apiBase}/crif-generate-client-report/${id}/`
  anchor.target = '_blank'
  anchor.download = `crif_report_${id}.pdf`
  anchor.click()
}
</script>
