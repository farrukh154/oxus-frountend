<template>
  <abacus-additional-search ref="additionalSearchModel" :action="searchFromAdditionalSearch" />
  <v-card class="pa-2 ma-2">
    <h3 class="pa-4">{{ title }}</h3>
    <v-form ref="AbacusClientSearchForm">
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="clientId"
            :rules="[inputRules.required]"
            type="number"
            density="compact"
            clearable
            label="ID Клиента"
            @keydown.enter.prevent="searchAbacusByClientId"
          />
        </v-col>

        <v-col cols="6" class="pb-10">
          <v-btn
            :loading="loading"
            class="mr-2"
            color="success"
            @click="searchAbacusByClientId"
            :append-icon="mdiSearchWeb"
          >
            Поиск
          </v-btn>
          <v-btn color="info" @click="searchAbacusDialog" :append-icon="mdiCog"> Дополнительный поиск </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-progress-linear v-if="loading" color="success" indeterminate :height="5"></v-progress-linear>

    <v-card v-if="clientInfo" class="pa-2">
      <V-row>
        <v-col cols="6">
          <v-card class="pa-2">
            <v-card-title>Информация о клиенте</v-card-title>
            <div align="right">
              <v-menu transition="slide-x-transition">
                <template v-slot:activator="{props}">
                  <v-btn color="primary" v-bind="props" size="small" :append-icon="mdiChevronDown"> Действия </v-btn>
                </template>
                <v-list>
                  <template v-for="action in clientActions">
                    <v-list-item @click="action.action(clientInfo)">
                      <template v-slot:prepend>
                        <v-icon :icon="action.icon" />
                      </template>
                      {{ action.title }}
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu>
            </div>
            Имя: {{ clientInfo.name }}<br />
            Пол: {{ clientInfo.gender }}<br />
            Паспорт: {{ clientInfo.passport }}<br />
            ИНН: {{ clientInfo.inn }}<br />
            Дата рождения: {{ clientInfo.dateofbirth }}<br />
            Филиал: {{ clientInfo.clientbranch }}<br />
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="pa-2">
            <v-card-title>Информация о кредитах</v-card-title>
            <v-table v-if="creditInfo.length" density="compact">
              <thead>
                <tr>
                  <th>Код контракта</th>
                  <th>Дата заявки</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in creditInfo" :key="item.name">
                  <v-tooltip activator="parent" location="bottom">
                    ID: {{ item.cuaccountid }}<br />
                    Выдан: {{ item.issued }}<br />
                    Дата выдачи: {{ item.issuedate }}<br />
                    Текущий график: {{ item.currentpart }}<br />
                    Активный: {{ item.active }}<br />
                    Сумма выдачи: {{ item.issueamount }}<br />
                    OLB: {{ item.olb }}<br />
                    Филиал: {{ item.creditbranch }}<br />
                  </v-tooltip>

                  <td>{{ item.accountnumber }}</td>
                  <td>{{ item.applydate }}</td>
                  <td>
                    <v-menu transition="slide-x-transition">
                      <template v-slot:activator="{props}">
                        <v-btn color="primary" v-bind="props" size="small" :append-icon="mdiChevronDown">
                          Действия
                        </v-btn>
                      </template>
                      <v-list>
                        <template v-for="action in contractActions">
                          <v-list-item @click="action.action(item)">
                            <template v-slot:prepend>
                              <v-icon :icon="action.icon" />
                            </template>
                            {{ action.title }}
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </V-row>
    </v-card>
  </v-card>
</template>

<script setup>
import {mdiSearchWeb, mdiCog} from '@mdi/js'
import ApiFactory from '../factories/api-factory'
import {toastWarning} from '../utils/toast'
import {inputRules} from '~/common/input-rules'
import {mdiChevronDown} from '@mdi/js'
import AbacusAdditionalSearch from './abacus-additional-search.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Поиск Клиента из Abacus',
  },
  contractActions: {
    type: Array,
    default: [],
  },
  clientActions: {
    type: Array,
    default: [],
  },
})
const apiClient = ApiFactory.build()

const clientId = ref()
const loading = ref(false)
const AbacusClientSearchForm = ref()
const clientInfo = ref()
const creditInfo = ref()
const additionalSearchModel = ref()

async function searchAbacusByClientId() {
  const valid = await AbacusClientSearchForm.value.validate()
  if (!valid.valid) {
    return
  }

  clientInfo.value = undefined
  creditInfo.value = undefined
  loading.value = true
  try {
    const res = await apiClient.post('/search-abacus-client-id/', {clientId: clientId.value})
    if (!res?.length) {
      toastWarning('Клиент не найден')
      return
    }
    clientInfo.value = res[0]
    creditInfo.value = res
  } finally {
    loading.value = false
  }
}

function searchAbacusDialog() {
  additionalSearchModel.value.openDialog()
}

async function searchFromAdditionalSearch(id) {
  clientId.value = id
  await nextTick()
  searchAbacusByClientId()
}
</script>
