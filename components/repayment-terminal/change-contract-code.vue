<template>
  <v-dialog v-model="dialog" width="380px">
    <v-card class="pt-2">
      <v-card-text>
        <v-text-field
          v-model="selectedContractCode"
          variant="outlined"
          label="Изменить контракт код"
          clearable
          type="number"
          :rules="[(value) => (value && value.length === 9) || 'Контракт код должен быть 9 символов']"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-col class="text-right">
          <v-btn color="primary" variant="outlined" @click="sendContractSave">сохранить</v-btn>
          <v-btn color="error" variant="outlined" @click="dialog = false">отмена</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from 'vue'
import ApiFactory from '~/factories/api-factory'
import {toastSuccess, toastWarning} from '../utils/toast'

const apiClient = ApiFactory.build()
const selectedContractCode = ref()
const selectedContractCodeId = ref()
const dialog = ref(false)

defineExpose({
  openDialogContract,
})

async function openDialogContract(id, accountnumber) {
  dialog.value = true
  selectedContractCode.value = accountnumber
  selectedContractCodeId.value = id
}

const sendContractSave = async () => {
  if (selectedContractCode.value.length !== 9) {
    toastWarning('Контракт код должен быть 9 символов')
    return
  }
  const bodyData = {
    selectedContractCode: selectedContractCode.value,
    selectedContractCodeId: selectedContractCodeId.value,
  }
  const res = await apiClient.post('/terminal-payment-change-contract/', bodyData)
  toastSuccess('Контракт Код успешно изменено!\nПосле изменения нажмите кнопку ЗАГРУЗИТЬ')
  dialog.value = false
}
onMounted(() => {
  sendContractSave
  openDialogContract
})
</script>
