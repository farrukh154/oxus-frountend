<template>
  <v-dialog v-model="dialog" persistent width="50%">
    <v-card class="pa-4">
      <v-card-actions>
        <v-spacer />
        <div v-if="formData.isReady" class="pa-4 text-red-lighten-1">
          Статус {{ getUIDFromId(formData.fields.status.value) }}
        </div>
        <v-btn variant="text" @click="dialog = false"> Закрыть </v-btn>
      </v-card-actions>
      <v-form v-if="formData.isReady" ref="form" class="pa-4">
        <v-select
          v-model="formData.fields.result.value"
          :items="formData.fields.result.choices"
          item-title="display_name"
          item-value="value"
          variant="outlined"
          :rules="[inputRules.required]"
        />
        <v-text-field
          v-model="formData.fields.credit_ID.value"
          v-if="result === 'disbursed'"
          label="Код контракта"
          variant="outlined"
          :rules="[inputRules.required]"
        />
        <autocomplete-field
          v-model="formData.fields.client_rejection_reason.value"
          v-if="result === 'cancelled'"
          :api-model="formData.fields.client_rejection_reason.related_to"
          label="Причина отказа"
          load-all
          :rules="[inputRules.required]"
        />
      </v-form>
      <v-card-item>
        <v-card-item>
          <v-row no-gutters>
            <v-spacer />
            <v-btn color="success" size="x-large" class="mr-2" @click="print">Распоряжение</v-btn>
            <v-btn :color="result === 'disbursed' ? 'success' : 'error'" size="x-large" @click="save">Сохранить</v-btn>
          </v-row>
        </v-card-item>
      </v-card-item>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {DataSource} from '~/dataSource/dataSource'
import {getIdFromUID, getUIDFromId, SwiftLoanStatuses} from '~/common/swift-loan'
import {inputRules} from '~/common/input-rules'

defineExpose({
  openDialog,
})
const dialog = shallowRef(false)
const formData = ref([])
const form = ref()

async function openDialog(id) {
  dialog.value = true
  formData.value = new DataSource('request_credits', id)
  await formData.value.init()
}

async function save() {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Заполните все поля')
    return
  }
  if (result.value === 'disbursed') {
    formData.value.fields.status.value = getIdFromUID(SwiftLoanStatuses.DISBURSED_UID)
  } else {
    formData.value.fields.status.value = getIdFromUID(SwiftLoanStatuses.CLIENT_REFUSED_UID)
  }
  await formData.value.save()
  dialog.value = false
}

const result = computed(() => formData?.value?.fields?.result?.value)

async function print() {
  const config = useRuntimeConfig()
  const anchor = document.createElement('a')
  anchor.href = `${config.public.apiBase}/print-order/${formData.value.primaryKeyValue}/`
  anchor.target = '_blank'
  anchor.download = `order_${formData.value.primaryKeyValue}.pdf`
  anchor.click()
}
</script>
