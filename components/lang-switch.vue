<template>
  <v-menu offset-y>
    <template #activator="{ props }">
      <v-btn variant="text" v-bind="props">
        <img :src="`/languages/imgList/${$i18n.locale}.svg`" :alt="$i18n.locale" height="20" width="27" />&nbsp;
        <span class="text-capitalize">
          {{ $i18n.locale }}
        </span>
        <v-icon :icon="mdiMenuDown" size="x-large" />
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="l in LOCALES" :key="l.code" @click="switchLanguage(l.code)">
        <img :src="`/languages/imgList/${l.code}.svg`" :alt="l.code" height="20" width="27" />&nbsp;{{ l.name }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { mdiMenuDown } from '@mdi/js'
import { LOCALES } from '/i18n.config'

const { locale } = useI18n()

function switchLanguage(value) {
  locale.value = value
}
</script>
