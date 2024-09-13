import {checkSavedToken} from '../utils/auth-data'

export default defineNuxtPlugin(() => {
  if (process.client) {
    checkSavedToken()
  }
})
