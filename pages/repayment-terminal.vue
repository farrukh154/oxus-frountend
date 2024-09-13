<template>
  <v-container class="pt-7 pl-7">
    <v-form ref="form">
      <v-row>
        <v-col cols="4">
          <date-picker v-model="dateFrom" label="Дата начало" :rules="[inputRules.required]" />
        </v-col>
        <v-col cols="4">
          <date-picker v-model="dateTo" label="Дата конца" :rules="[inputRules.required]" />
        </v-col>

        <v-col cols="4" style="max-height: 100px; overflow-y: auto">
          <autocompleteFieldVue
            v-model="branch"
            api-model="branches"
            item-title="description"
            load-all
            clearable
            label="Филиал"
            multiple
            chips
            :rules="[inputRules.arrayRequired]"
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="displayCurrency"
            :items="[
              {id: 0, value: 'ALL'},
              {id: 1, value: 'USD'},
              {id: 18, value: 'TJS'},
            ]"
            label="Валюта для показа"
            variant="outlined"
            clearable
            item-title="value"
            item-value="id"
            :rules="[inputRules.required]"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="conversionCurrency"
            :items="[
              {id: 1, value: 'USD'},
              {id: 18, value: 'TJS'},
            ]"
            label="Валюта для конвертации"
            variant="outlined"
            clearable
            item-title="value"
            item-value="id"
            :rules="[inputRules.required]"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-btn
            :loading="loading"
            color="success"
            size="x-large"
            :append-icon="mdiTableArrowDown"
            block
            @click="loadTerminal"
          >
            Загрузить
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <hr />
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title> Другие фильтры </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col>
              <date-picker v-model="afDateFrom" label="Дата начало" />
            </v-col>
            <v-col>
              <date-picker v-model="afDateTo" label="Дата конца" />
            </v-col>
            <v-col>
              <v-text-field
                clearable
                style="height: 90px"
                v-model="afClientCode"
                density="compact"
                label="Код клиента"
              />
            </v-col>
            <v-col>
              <v-text-field
                clearable
                style="height: 90px"
                v-model="afCreditCode"
                density="compact"
                label="Код контракта"
              />
            </v-col>
            <v-col>
              <v-btn
                :disabled="!afClientCode && !afCreditCode"
                :loading="loading"
                size="small"
                color="success"
                @click="afLoadTerminal"
              >
                Загрузить
              </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-progress-linear v-if="loading" color="success" indeterminate :height="5"></v-progress-linear>

    <v-table v-if="tableData.length" class="table fixed-header" height="500px">
      <thead>
        <tr>
          <th>ID</th>
          <th>PayDate</th>
          <th>Amount</th>
          <th>TypeOper</th>
          <th>Name</th>
          <th>AccountNumber</th>
          <th>Notes</th>
          <th>Branch</th>
          <th>SubBranch</th>
          <th>TransactionID</th>
          <th>tpAccountNumber</th>
          <th>CustomerID</th>
          <th v-if="can('terminals', 'can-change-terminal-payments')" style="background-color: #1867c0">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index" :title="item.paydate">
          <td>{{ item.id }}</td>
          <td>{{ item.paydate }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.typeoper }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.accountnumber }}</td>
          <td>{{ item.notes }}</td>
          <td>{{ item.branch }}</td>
          <td>{{ item.subbranch }}</td>
          <td>{{ item.transactionid }}</td>
          <td>{{ item.tpaccountnumber }}</td>
          <td>{{ item.customerid }}</td>
          <td v-if="can('terminals', 'can-change-terminal-payments')">
            <v-menu transition="slide-x-transition">
              <template v-slot:activator="{props}">
                <v-btn color="primary" v-bind="props" :append-icon="mdiChevronDown"> Действия </v-btn>
              </template>
              <v-list>
                <v-list-item @click="openDialog(item)"> Изменить дату </v-list-item>
                <v-list-item @click="openDialogContract(item)"> Изменить контракт код </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-table>

    <changeRepayDate ref="changeRepayDateRef" />
    <changeContractCode ref="changeContractCodeRef" />
  </v-container>
</template>

<script setup>
import ApiFactory from '~/factories/api-factory'
import autocompleteFieldVue from '~/components/autocomplete-field.vue'
import {toastSuccess, toastWarning} from '../utils/toast'
import {mdiChevronDown} from '@mdi/js'
import {mdiTableArrowDown} from '@mdi/js'
import changeRepayDate from '~/components/repayment-terminal/change-repay-date.vue'
import changeContractCode from '~/components/repayment-terminal/change-contract-code.vue'
import {can} from '~/common/ability'
import {inputRules} from '~/common/input-rules'

const branch = ref()
const currentDate = ref(new Date().toISOString().split('T')[0])
const dateFrom = ref(currentDate.value)
const dateTo = ref(currentDate.value)
const apiClient = ApiFactory.build()
const displayCurrency = ref(0)
const conversionCurrency = ref(18)
const form = ref()
const tableData = ref([])
const loading = ref(false)
const changeRepayDateRef = ref()
const changeContractCodeRef = ref()

const afClientCode = ref()
const afCreditCode = ref()
const afDateFrom = ref()
const afDateTo = ref()

const openDialogContract = (item) => {
  changeContractCodeRef.value.openDialogContract(item.id, item.tpaccountnumber)
}

const openDialog = (item) => {
  changeRepayDateRef.value.openDialog(item.id, item.paydate)
}

const loadTerminal = async () => {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Пожалуйста, заполните все обязательные поля')
    return
  }
  loading.value = true
  try {
    const branchValue = Array.isArray(branch.value) ? branch.value.join(',') : ''
    const bodyData = {
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
      branch: branchValue,
      displayCurrency: displayCurrency.value,
      conversionCurrency: conversionCurrency.value,
    }
    const res = await apiClient.post('/get-terminal-records/', bodyData)
    tableData.value = res || []
    toastSuccess(`Данные успешно загружены. Найдено ${tableData.value.length} записей`)
  } finally {
    loading.value = false
  }
}

async function afLoadTerminal() {
  loading.value = true
  try {
    const res = await apiClient.post('/get-terminal-records/', {
      afClientCode: afClientCode.value,
      afCreditCode: afCreditCode.value,
      afDateFrom: afDateFrom.value,
      afDateTo: afDateTo.value,
    })
    tableData.value = res || []
    toastSuccess(`Данные успешно загружены. Найдено ${tableData.value.length} записей`)
  } finally {
    loading.value = false
  }
}

async function loadBranches() {
  const res = await apiClient.get('/division/branches')
  branch.value = res.branches.map((branch) => branch.id)
}

onMounted(() => {
  loadBranches()
})
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
