import ApiFactory from "../factories/api-factory";

export const STORAGE_AUTH_ACCESS_TOKEN = 'access_token';
export const STORAGE_AUTH_REFRESH_TOKEN = 'refresh_token';

export const accessToken = shallowRef('')
export const refreshToken = shallowRef('')

export const user = ref({})

export function resetAuthData() {
  accessToken.value = ''
  refreshToken.value = ''
  user.value = {}
  localStorage.removeItem(STORAGE_AUTH_ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_AUTH_REFRESH_TOKEN);
}

export function setAuthData(data) {
  accessToken.value = data.access
  refreshToken.value = data.refresh
  localStorage.setItem(STORAGE_AUTH_ACCESS_TOKEN, data.access);
  localStorage.setItem(STORAGE_AUTH_REFRESH_TOKEN, data.refresh);
}

export async function checkSavedToken() {
  if (localStorage.getItem(STORAGE_AUTH_ACCESS_TOKEN) && localStorage.getItem(STORAGE_AUTH_REFRESH_TOKEN)) {
    accessToken.value = localStorage.getItem(STORAGE_AUTH_ACCESS_TOKEN)
    refreshToken.value = localStorage.getItem(STORAGE_AUTH_REFRESH_TOKEN)
    let apiClient = ApiFactory.build();
    const res = await apiClient.get('/auth/me/')
    user.value = res
  }
}