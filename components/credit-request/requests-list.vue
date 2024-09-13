<template>
  <v-dialog v-model="dialog">
    <v-card class="pa-4">
      <v-card-actions>
        {{ title }}
        <v-spacer />
        <v-btn variant="outlined" color="red" @click="dialog = false"> Закрыть </v-btn>
      </v-card-actions>

      <dynamic-data-table
        tableTitle=""
        modelName="request_credits"
        :can-export="true"
        :columns="[
          {name: 'status.uid', label: 'Status'},
          {name: 'status_change_date', label: 'Status change date'},
          {name: 'branch.description', label: 'Branch'},
          {name: 'customer.name', label: 'Name'},
        ]"
        :show-columns="['status.uid', 'status_change_date', 'branch.description', 'customer.name']"
        :can-create="false"
        :can-update="false"
        :can-delete="false"
        :selectable="false"
        :external-filter="`${query.join('&')}&${additionalFilter}`"
      >
        <template v-slot:actions="{item}">
          <v-menu v-if="user.swift_loan_role !== SwiftLoanUserRole.cashier">
            <template #activator="{props}">
              <v-btn color="primary" size="small" v-bind="props" :append-icon="mdiChevronUp"> Действия </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(action, index) in actions"
                :key="index"
                @click="actionForClientById(item.id, action.action)"
              >
                {{ action.title }}
              </v-list-item>
            </v-list>
          </v-menu>
          <div v-else>
            {{ item.approve_amount }}
            {{ item.approve_currency_new }}
          </div>
        </template>
      </dynamic-data-table>
    </v-card>
  </v-dialog>
  <v-btn color="primary" @click="dialog = true">
    {{ title }}
    <v-badge color="success" :content="count" inline />
  </v-btn>
  <v-btn :loading="loading" icon color="success" size="x-small" class="ml-2" @click="loadCount">
    <v-icon :icon="mdiReload" />
    <v-tooltip activator="parent" location="bottom">Обновить</v-tooltip>
  </v-btn>

  <request-for-loan ref="requestForLoanDialog" />
  <application-decision ref="applicationDecisionDialog" />
  <decloration-loan ref="declorationLoanDialog" />
  <result-loan ref="resultLoanDialog" />
</template>

<script setup>
import {mdiChevronUp, mdiReload} from '@mdi/js'
import {SwiftLoanSearchAction, SwiftLoanUserRole} from '~/common/swift-loan'
import RequestForLoan from '~/components/credit-request/request-for-loan.vue'
import ApplicationDecision from '~/components/credit-request/application-decision.vue'
import DeclorationLoan from '~/components/credit-request/decloration-loan.vue'
import ResultLoan from '~/components/credit-request/result-loan.vue'
import {toastWarning, toastError} from '../utils/toast'
import {user} from '~/utils/auth-data'
import DynamicDataTable from '~/components/dynamic_table/dynamic-data-table.vue'
import ApiFactory from '~/factories/api-factory'

const props = defineProps({
  title: {required: true, type: String},
  requestStatus: {required: true, type: Array},
  actions: {required: true, type: Object},
  additionalFilter: {type: String, default: ''},
})

const requestForLoanDialog = ref()
const declorationLoanDialog = ref()
const applicationDecisionDialog = ref()
const resultLoanDialog = ref()

const loading = ref(false)

const count = shallowRef()
const dialog = ref(false)

let apiClient = ApiFactory.build()

let query = props.requestStatus.map((rs) => {
  return `filter{status.uid.in}=${rs}`
})

onMounted(() => {
  loadCount()
})

async function loadCount() {
  try {
    loading.value = true
    const res = await apiClient.get(`/request_credit/request_credits?${query.join('&')}&${props.additionalFilter}`)
    count.value = res.meta.total_results
  } catch (e) {
    toastError(e)
  } finally {
    loading.value = false
  }
}

function actionForClientById(id, action) {
  switch (action) {
    case SwiftLoanSearchAction.openRequest:
      requestForLoanDialog.value.openDialog(id, '')
      break
    case SwiftLoanSearchAction.openDeclaration:
      declorationLoanDialog.value.openDialog(id)
      break
    case SwiftLoanSearchAction.protocol:
      applicationDecisionDialog.value.openDialog(id)
      break
    case SwiftLoanSearchAction.result:
      resultLoanDialog.value.openDialog(id)
      break
    default:
      toastWarning('Действие не задано')
  }
}
</script>
