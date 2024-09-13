<template>
  <v-dialog v-model="dialog" persistent width="90%">
    <v-card class="pa-4">
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="dialog = false"> Закрыть </v-btn>
      </v-card-actions>
      <v-form v-if="formData.isReady" ref="form" class="pa-4">
        <h1 class="text-h6 mb-4" style="text-align: center">
          <strong> Форма - Решение клиента </strong>
        </h1>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="formData.fields.application_receipt_channel.value"
              :items="formData.fields.application_receipt_channel.choices"
              label="Канал поступления заявки"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
            <v-select
              v-model="formData.fields.client_decision.value"
              :items="formData.fields.client_decision.choices"
              label="Решение клиента"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
            <v-text-field v-model="formData.fields.created.value" readonly label="Дата занесения информации" />
            <v-text-field v-model="formData.fields.customer_response.value" label="Ответ/комментарии клиента" />
            <v-text-field v-model="formData.fields.employee_comments.value" label="Комментарии сотрудника" />
          </v-col>
          <v-col cols="4">
            <v-select
              v-if="formData.fields.client_decision.value === 'missed-call'"
              v-model="formData.fields.missed_call.value"
              :items="formData.fields.missed_call.choices"
              label="Недозвон"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
            <v-select
              v-if="formData.fields.client_decision.value === 'refused'"
              v-model="formData.fields.client_refused.value"
              :items="formData.fields.client_refused.choices"
              label="Отказался"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
            <v-btn
              v-if="formData.fields.client_decision.value === 'agree'"
              color="success"
              size="large"
              @click="openRequestDialog()"
              >Форма заявки</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
      <v-card-item>
        <v-row no-gutters>
          <v-spacer />
          <v-btn color="success" size="x-large" class="mr-2" @click="save">Сохранить</v-btn>
        </v-row>
      </v-card-item>
    </v-card>
  </v-dialog>
  <request-for-loan ref="requestForLoanDialog" />
</template>

<script setup>
import {DataSource} from '~/dataSource/dataSource'
import RequestForLoan from '~/components/credit-request/request-for-loan.vue'
import {inputRules} from '~/common/input-rules'
import ApiFactory from '~/factories/api-factory'
import {clientSync} from './client-sync'

defineExpose({
  openDialog,
})
const dialog = shallowRef(false)
const formData = ref([])
const clientFormData = ref()
const form = ref()
const requestForLoanDialog = ref()
const abacusClientId = ref()
const apiClient = ApiFactory.build()

async function openDialog(id, abacusClient) {
  dialog.value = true
  formData.value = new DataSource('client_decisions', id)
  await formData.value.init()
  abacusClientId.value = abacusClient
  searchClientAbacus({client_ID: abacusClientId.value})
}

async function save() {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Заполните все поля')
    return
  }
  await formData.value.save()
}

async function openRequestDialog() {
  await formData.value.save()
  requestForLoanDialog.value.openDialog(null, abacusClientId.value, formData.value.primaryKeyValue)
}

watch(
  () => formData.value.fields?.client_decision?.value,
  (curr, prev) => {
    if (!formData.value.isReady) {
      return
    }
  },
)

async function searchClientAbacus(data) {
  const res = await apiClient.post('/request_credit/search_client_extra', {
    ...data,
  })
  if (res.length > 1) {
    toastWarning('Найдено более одного клиента')
  } else if (!res.length) {
    toastWarning('Не найдено')
  } else {
    loadInfoFromData(res[0])
  }
}

async function loadInfoFromData(clientData) {
  clientFormData.value = await clientSync(clientData)
  formData.value.fields.customer.value = clientFormData.value.primaryKeyValue
  formData.value.fields.active_in_abacus.value = !!clientData.olb_tjs
}
</script>
