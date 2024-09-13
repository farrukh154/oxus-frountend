<template>
  <v-progress-linear v-if="loading" color="primary" class="mt-5" indeterminate :height="5"></v-progress-linear>

  <dynamic-data-table
      tableTitle=""
      modelName="currency_exchanges"
      :can-export="true"
      :columns="[
        {name: 'date', label: 'Дата'},
        {name: 'rate', label: 'Курс'},
      ]"
      :show-columns="['date', 'rate']"
      :can-create="false"
      :can-update="false"
      :can-delete="false"
      :selectable="false"
      :external-filter="`filter{currency_from.uid}=${currencyFrom}&filter{currency_to.uid}=${currencyTo}`"
      ref="refreshTable"
    >

      <template v-slot:servicePanel>
        <v-btn
          :loading="loading"
          color="primary"
          size="small"
          class="mr-2"
          :append-icon="mdiTableRefresh"
          @click="synchronizeWithNbt"
        >
        {{$t('settings.syncnbt') }}
        </v-btn>
      </template>

    </dynamic-data-table>

</template>

<script setup>
import ApiFactory from '~/factories/api-factory'
import {toastSuccess, toastWarning} from '../utils/toast'
import {mdiTableRefresh} from '@mdi/js'
import DynamicDataTable from '~/components/dynamic_table/dynamic-data-table.vue'

const apiClient = ApiFactory.build()
const loading = ref(false)
const refreshTable = ref()

const props = defineProps({
  currencyFrom: {
    type: String,
    required: true,
  },
  currencyTo: {
    type: String,
    required: true,
  },
})

async function synchronizeWithNbt() {
  loading.value = true
  try {
    const bodyData = {
      currencyTo: props.currencyTo,
    }
    const res = await apiClient.post('/synchronize-nbt-currency/', bodyData)
    toastSuccess(res.message)
  } catch {
    toastWarning('Ошибка при синхронизации с НБТ')
  } finally {
    loading.value = false
    refreshTable.value.refreshData()
  }
}

</script>

<style>
.table {
  margin-top: 20px;
  margin-bottom: 20px;
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
  border: 2px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>