<template>
  <v-dialog v-model="dialog" width="380px">
    <v-card>
      <v-card-text>
        <date-picker label="Изменить Дату" v-model="selectedDate" :rules="[inputRules.required]" />
      </v-card-text>
      <v-card-actions>
        <v-col class="text-right">
          <v-btn color="primary" variant="outlined" @click="sendDateSave">сохранить</v-btn>
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
import {inputRules} from '~/common/input-rules'

const apiClient = ApiFactory.build()
const dialog = ref(false)
const selectedDate = ref()
const selectedId = ref()

defineExpose({
  openDialog,
})

async function openDialog(id, date) {
  dialog.value = true
  selectedDate.value = date
  selectedId.value = id
}

const sendDateSave = async () => {
  if (selectedDate.value) {
    const res = await apiClient.post('/terminal-payment-change-date/', {
      selectedId: selectedId.value,
      selectedDate: selectedDate.value,
    })
    toastSuccess('Дата успешно изменено!\nПосле изменения нажмите кнопку ЗАГРУЗИТЬ')
    dialog.value = false
  }
}

onMounted(() => {
  sendDateSave
  openDialog
})
</script>
