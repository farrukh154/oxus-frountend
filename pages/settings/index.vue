<template>
  <v-tabs v-model="tab" bg-color="#EBEBF0" color="green">
    <v-tab v-if="can('users', 'view-exchange-rate-tab-item')" value="courses">Курсы валют</v-tab>
  </v-tabs>

  <v-window v-model="tab" class="pa-2">
    <v-window-item v-if="can('users', 'view-exchange-rate-tab-item')" value="courses">
      <v-tabs v-model="innerTab" bg-color="#EBEBF0" color="green">
        <v-tab value="nbt">НБТ</v-tab>
      </v-tabs>

      <v-window v-model="innerTab" class="pa-2">
        <v-window-item value="nbt">
          <v-tabs v-model="itemTab" bg-color="#EBEBF0" color="green">
            <v-tab value="tjs_usd">TJS-USD</v-tab>
            <v-tab value="tjs_eur">TJS-EUR</v-tab>
            <v-tab value="tjs_rub">TJS-RUB</v-tab>
          </v-tabs>

          <v-window v-model="itemTab">
            <v-window-item value="tjs_usd">
              <nbt currencyFrom="TJS" currencyTo="USD" />
            </v-window-item>

            <v-window-item value="tjs_eur">
              <nbt currencyFrom="TJS" currencyTo="EUR" />
            </v-window-item>

            <v-window-item value="tjs_rub">
              <nbt currencyFrom="TJS" currencyTo="RUB" />
            </v-window-item>
          </v-window>
        </v-window-item>
      </v-window>
    </v-window-item>
  </v-window>
</template>

<script setup>
import nbt from '~/components/currency/nbt.vue'
import {can} from '~/common/ability'

const tab = ref('courses')
const innerTab = ref('nbt')
const itemTab = ref('tjs_usd')
</script>
