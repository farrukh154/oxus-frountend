<template>
  <v-dialog v-model="dialog" persistent max-width="40%">
    <v-card>
      <v-card-title>Изменение пароля</v-card-title>
      <v-form class="pa-4" ref="changePasswordForm">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="oldPassword"
              :type="old_showPassword ? 'text' : 'password'"
              label="Текущий пароль"
              :rules="[inputRules.required]"
            >
              <template #append-inner>
                <v-icon
                  tabindex="-1"
                  aria-label="show hide password"
                  :icon="old_showPassword ? mdiEye : mdiEyeOff"
                  @click="old_showPassword = !old_showPassword"
                />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="newPassword"
              label="Новый пароль"
              :type="new_showPassword ? 'text' : 'password'"
              :rules="[inputRules.required, inputRules.password]"
            >
              <template #append-inner>
                <v-icon
                  tabindex="-1"
                  aria-label="show hide password"
                  :icon="new_showPassword ? mdiEye : mdiEyeOff"
                  @click="new_showPassword = !new_showPassword"
                />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="confirmPassword"
              label="Подтвердите новый пароль"
              :type="con_showPassword ? 'text' : 'password'"
              :rules="[inputRules.required, inputRules.password]"
            >
              <template #append-inner>
                <v-icon
                  tabindex="-1"
                  aria-label="show hide password"
                  :icon="con_showPassword ? mdiEye : mdiEyeOff"
                  @click="con_showPassword = !con_showPassword"
                />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer />
          <v-btn @click="changePassword" color="success" class="mr-2">Изменить пароль</v-btn>
          <v-btn @click="exit">Закрыть</v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {mdiEye, mdiEyeOff} from '@mdi/js'
import {ref} from 'vue'
import ApiFactory from '../factories/api-factory'
import {inputRules} from '~/common/input-rules'

const old_showPassword = shallowRef(false)
const new_showPassword = shallowRef(false)
const con_showPassword = shallowRef(false)
const apiClient = ApiFactory.build()
const dialog = ref(false)
const oldPassword = ref('')
const confirmPassword = ref('')
const newPassword = ref('')
const changePasswordForm = ref(false)
defineExpose({
  openDialog,
})

async function changePassword() {
  const valid = await changePasswordForm.value.validate()
  if (!valid.valid) {
    return
  }
  if (confirmPassword.value !== newPassword.value) {
    toastWarning(
      'Пароль для подтверждения не совпадает с новым паролем. Пожалуйста, убедитесь, что введённые пароли совпадают и повторите попытку.',
    )
    return
  }
  const response = await apiClient.post('/change-password/', {
    old_password: oldPassword.value,
    new_password: newPassword.value,
  })
  toastSuccess(response.message)
  exit()
}

function openDialog() {
  dialog.value = true
}

function exit() {
  oldPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  dialog.value = false
}
</script>
