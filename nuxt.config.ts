export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  css: [
    '~/assets/css/global.css',
  ],

  modules: [
    '@nuxtjs/i18n',
    'dayjs-nuxt',
  ],

  i18n: {
    vueI18n: './i18n.config.ts',
    locales: ['en', 'ru', 'tj'],
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL || 'https://baconipsum.com/api',
    },
  },

  plugins: [
      "~/plugins/event-bus.ts",
      "~/plugins/event-bus-listener.ts",
      "~/plugins/vuetify.ts",
  ],

  compatibilityDate: '2024-07-02'
})