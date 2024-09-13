<template>
  <div style="text-align: right;" class="mr-8 mt-3">
    <LangSwitch />
  </div>
  <v-row justify="space-around" class="pt-16">
    <v-col cols="10" sm="8" md="6" lg="4" xl="4">
      <div style="text-align: center" class="pb-12">
        <img src="/assets/images/brand/logo_tj.png" alt="Oxus" />
      </div>
      <v-alert id="authAlertMessage" v-if="messageBoxDisplay">{{ messageBoxText }}</v-alert>
      <v-form id="loginForm" ref="loginForm" name="loginForm" lazy-validation @keyup.enter="authenticate">
        <h3>{{ $t('login.title') }}</h3>
        <v-text-field
          id="username"
          v-model="userName"
          name="username"
          :rules="[(v) => !!v || $t('gt.required')]"
          validate-on-blur
          :label="$t('login.userName')"
          class="mt-3 mb-2"
          clearable
        />
        <v-text-field
          id="password"
          v-model="password"
          name="password"
          :rules="[(v) => !!v || $t('gt.required')]"
          validate-on-blur
          :type="showPassword ? 'text' : 'password'"
          :label="$t('login.password')"
          clearable
        >
          <template #append-inner>
            <v-icon
              tabindex="-1"
              aria-label="show hide password"
              :icon="showPassword ? mdiEye : mdiEyeOff"
              @click="showPassword = !showPassword"
            />
          </template>
        </v-text-field>
        <v-btn color="success" class="float-right" size="small" @click="authenticate">
          <v-icon start :icon="mdiAccountCheck" />
          {{ $t('login.signbutton') }}
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {mdiAccountCheck, mdiEye, mdiEyeOff} from '@mdi/js'
import AuthService from '../services/auth-service'
import {useRouter} from 'nuxt/app'

definePageMeta({layout: 'blank'})
const userName = shallowRef('')
const password = shallowRef('')

const showPassword = shallowRef(false)

const loginForm = ref(false)

const messageBoxDisplay = ref(false)
const messageBoxText = ref('')

const router = useRouter()
const localePath = useLocalePath()
const moveToIndex = () => router.push({path: localePath('/')})

async function authenticate() {
  // @todo add field validation
  messageBoxDisplay.value = false
  const valid = await loginForm.value.validate()
  if (!valid.valid) {
    return
  }
  let authService = new AuthService()
  let authResponse = await authService.authenticate(userName.value, password.value)
  if (authResponse) {
    console.debug('Navigating home')
    // await navigateTo({path:'/'});
    moveToIndex()
    return
  }

  messageBoxDisplay.value = true
  messageBoxText.value = 'Authentication failed'
}
</script>

<style scoped></style>