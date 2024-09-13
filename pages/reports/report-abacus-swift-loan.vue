<template>
  <v-card class="pa-2 ma-2">
    <v-card-title>Abacus client list for Swift loan</v-card-title>
    <v-form ref="form">
      <v-row>
        <v-col cols="4">
          <date-picker v-model="date" label="Дата" :rules="[inputRules.required]" />
        </v-col>
        <v-btn :loading="loading" color="success" class="ma-2" :prepend-icon="mdiDownload" block @click="loadReport">
          Сформировать
        </v-btn>
      </v-row>
    </v-form>

    <report-logging :loading="loading" :report-type="REPORT_UID" />
  </v-card>
</template>

<script setup>
import ApiFactory from '~/factories/api-factory'
import {toastSuccess, toastWarning} from '~/utils/toast'
import {mdiDownload} from '@mdi/js'
import {inputRules} from '~/common/input-rules'
import reportLogging from '~/components/report-logging.vue'

const REPORT_UID = 'report-abacus-swift-loan'

const currentDate = ref(new Date().toISOString().split('T')[0])
const date = ref(currentDate.value)
const apiClient = ApiFactory.build()
const form = ref()
const loading = ref(false)

const loadReport = async () => {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Пожалуйста, заполните все обязательные поля')
    return
  }
  loading.value = true
  try {
    const res = await apiClient.post(`/reports/${REPORT_UID}/`, {date: date.value})
    toastSuccess(res.message)
  } finally {
    loading.value = false
  }
}
</script>
