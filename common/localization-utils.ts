export function t(name: string, data: any = {}) {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$i18n.t(name, data)
}

export function getCurrentLocale() {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$i18n.locale
}
