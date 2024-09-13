<template>
  <v-container>
    <swift-loan-header />
    <v-row>
      <v-col cols="3">
        <v-row>
          <v-text-field
            v-model="searchValues.client_ID"
            type="number"
            clearable
            label="ID Клиента"
            variant="outlined"
          />
        </v-row>
        <v-row>
          <v-text-field v-model="searchValues.name" clearable label="ФИО клиента" variant="outlined" />
        </v-row>
        <v-row>
          <v-text-field v-model="searchValues.credit_ID" clearable label="Кредитный счёт" variant="outlined" />
        </v-row>
        <v-row>
          <v-text-field v-model="searchValues.INN" type="number" clearable label="ИНН" variant="outlined" />
        </v-row>
        <v-row>
          <v-text-field v-model="searchValues.passport" clearable label="Номер Паспорта" variant="outlined" />
        </v-row>
        <v-row>
          <v-text-field v-model="searchValues.id" type="number" clearable label="Код заявки" variant="outlined" />
        </v-row>
        <v-row class="pb-4">
          <v-btn block color="success" size="x-large" @click="searchCredit">Поиск</v-btn>
        </v-row>
        <v-row v-if="hasAccessToAdd()">
          <v-btn
            block
            color="success"
            size="x-large"
            @click="actionForSearchedClient(SwiftLoanSearchAction.newRequest)"
          >
            Новый клиент
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="9" class="pt-10">
        <v-row v-for="(parts, index) in swiftPermissions.window" :key="index">
          <v-col cols="3" class="pa-2" />
          <v-col cols="9" class="pa-2">
            <requests-list
              :title="parts.title"
              :request-status="parts.status"
              :actions="parts.actions"
              :additional-filter="parts?.additionalFilter"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-table class="header mt-7 mx-4" v-if="searchResults.length">
            <thead>
              <tr>
                <th>Офис</th>
                <th>ФИО</th>
                <th>Номер счета</th>
                <th>Код клиента</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in searchResults" :key="item.name">
                <td>{{ item.branch_name }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.credit_id || item.credit_ID }}</td>
                <td>{{ item.client_id || item.client_ID }}</td>
                <td>
                  <v-menu>
                    <template #activator="{props}">
                      <v-btn color="primary" v-bind="props" :append-icon="mdiChevronUp"> Действия </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(action, index) in swiftPermissions.searchAction"
                        :key="index"
                        @click="actionForSearchedClient(action.action, item.client_id || item.client_ID)"
                      >
                        {{ action.title }}
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-row>
      </v-col>
    </v-row>

    <request-for-loan ref="requestForLoanDialog" />
    <client-information ref="clientInformationDialog" />
    <application-decision ref="applicationDecisionDialog" />
    <client-decision ref="clientDecisionDialog" />
  </v-container>
</template>

<script setup>
import {getSwiftLoanPermissions, SwiftLoanUserRole, SwiftLoanSearchAction} from '~/common/swift-loan'
import RequestForLoan from '~/components/credit-request/request-for-loan.vue'
import clientInformation from '~/components/credit-request/client-information.vue'
import ApplicationDecision from '~/components/credit-request/application-decision.vue'
import RequestsList from '~/components/credit-request/requests-list.vue'
import ClientDecision from '~/components/credit-request/client-decision.vue'
import SwiftLoanHeader from '~/components/credit-request/swift-loan-header.vue'
import ApiFactory from '../factories/api-factory'
import {toastSuccess, toastInfo, toastWarning} from '../utils/toast'
import {user} from '~/utils/auth-data'
import {FetchedSwiftLoanStatuses, SwiftLoanStatuses} from '~/common/swift-loan'
import {mdiChevronUp} from '@mdi/js'

const defaultValues = {
  client_ID: '',
  credit_ID: '',
  name: '',
  INN: '',
  passport: '',
  id: '',
}

const apiClient = ApiFactory.build()

const searchValues = ref(defaultValues)
const searchResults = ref([])
const requestForLoanDialog = ref()
const clientInformationDialog = ref()
const applicationDecisionDialog = ref()
const clientDecisionDialog = ref()

const swiftPermissions = ref(getSwiftLoanPermissions())

onMounted(async () => {
  const res = await apiClient.get('/request_credit/request_statuses')
  FetchedSwiftLoanStatuses.value = res.request_statuses
})

async function searchCredit() {
  if (searchValues.value.id) {
    const res = await apiClient.get(
      `/request_credit/request_credits?include[]=customer.*&include[]=branch.*&filter{id}=${searchValues.value.id}`,
    )
    searchResults.value = res.request_credits
    if (res.customers) {
      searchResults.value[0].name = res.customers[0].name
      searchResults.value[0].client_ID = res.customers[0].client_ID
    }
    if (res.branches) {
      searchResults.value[0].branch_name = res.branches[0].description
    }
    if (!res.request_credits.length) {
      toastInfo('Заявка не найдена')
      return
    }
    toastSuccess('Заявка найдена')
    return
  }
  let urlFilterParam = {}
  for (const [key, value] of Object.entries(searchValues.value)) {
    if (value) {
      urlFilterParam[key] = value
    }
  }
  if (Object.keys(urlFilterParam).length) {
    searchResults.value = []
    const res = await apiClient.post('/request_credit/search_client', urlFilterParam)
    searchResults.value = res
    if (searchResults.value.length) {
      toastSuccess(`Найдено ${searchResults.value.length} записей`)
    } else {
      toastInfo('Записей не найдено')
    }
  } else {
    toastWarning('Фильтры пусты, пожалуйста введите значения в фильтр')
  }
}

async function actionForSearchedClient(action, clientId = '') {
  let res
  switch (action) {
    case SwiftLoanSearchAction.newRequest:
      requestForLoanDialog.value.openDialog(0, clientId)
      break
    case SwiftLoanSearchAction.newRequestBased:
      res = await apiClient.get(
        `/request_credit/request_credits?filter{status.uid.in}=${SwiftLoanStatuses.CREATED_UID}&filter{status.uid.in}=${SwiftLoanStatuses.TO_UNDERWRITER_UID}&filter{status.uid.in}=${SwiftLoanStatuses.POSTPONED_UID}&filter{customer.client_ID}=${clientId}`,
      )
      if (res.request_credits.length) {
        toastInfo('Активная заявка уже существует, открыта активная заявка')
        requestForLoanDialog.value.openDialog(res.request_credits[0].id, '')
      } else {
        requestForLoanDialog.value.openDialog(0, clientId)
      }
      break
    case SwiftLoanSearchAction.openRequest:
      res = await apiClient.get(
        `/request_credit/request_credits?filter{status.uid.in}=${SwiftLoanStatuses.TO_UNDERWRITER_UID}&filter{customer.client_ID}=${clientId}`,
      )
      if (res.request_credits.length) {
        toastInfo('Активная заявка уже существует, открыта активная заявка')
        requestForLoanDialog.value.openDialog(res.request_credits[0].id, '')
      } else {
        toastWarning('Нет активной заявки')
      }
      break
    case SwiftLoanSearchAction.protocol:
      res = await apiClient.get(
        `/request_credit/request_credits?filter{status.uid.in}=${SwiftLoanStatuses.TO_UNDERWRITER_UID}&filter{customer.client_ID}=${clientId}`,
      )
      if (res.request_credits.length) {
        applicationDecisionDialog.value.openDialog(res.request_credits[0].id, '')
      } else {
        toastWarning('Нет активной заявки')
      }
      break
    case SwiftLoanSearchAction.clientInformation:
      clientInformationDialog.value.openDialog(clientId)
      break
    case SwiftLoanSearchAction.clientDecision:
      clientDecisionDialog.value.openDialog(0, clientId)
      break
    default:
      toastWarning('Действие не задано')
  }
}

function hasAccessToAdd() {
  return (
    [SwiftLoanUserRole.customerServiceSpecialist, SwiftLoanUserRole.callOfficer].includes(user.value.swift_loan_role) ||
    user.value.is_superuser
  )
}
</script>

<style scoped>
.header th {
  background-color: #65b741;
  color: white;
}
</style>
