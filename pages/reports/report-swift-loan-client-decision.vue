<template>
  <v-card class="pa-2 ma-2">
    <v-card-title>Swift Loan Client Decision</v-card-title>
    <v-form ref="form">
      <v-row>
        <v-col cols="4">
          <date-picker v-model="dateStart" label="Дата начало" :rules="[inputRules.required]" />
        </v-col>
        <v-col cols="4">
          <date-picker v-model="dateEnd" label="Дата конца" :rules="[inputRules.required]" />
        </v-col>
        <v-col cols="12" style="max-height: 100px; overflow-y: auto">
          <autocomplete-field
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
import autocompleteField from '~/components/autocomplete-field.vue'
import {toastSuccess, toastWarning} from '~/utils/toast'
import {mdiDownload} from '@mdi/js'
import {inputRules} from '~/common/input-rules'
import reportLogging from '~/components/report-logging.vue'

const REPORT_UID = 'report-swift-loan-client-decision'

const branch = ref()
const currentDate = ref(new Date().toISOString().split('T')[0])
const dateStart = ref(currentDate.value)
const dateEnd = ref(currentDate.value)
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
    const branchValues = Array.isArray(branch.value) ? branch.value.join(',') : ''
    const bodyData = {
      date_start: dateStart.value,
      date_end: dateEnd.value,
      branch: branchValues,
    }
    const res = await apiClient.post('/reports/report-swift-loan-client-decision/', bodyData)
    toastSuccess(res.message)
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
