<template>
  <v-dialog v-model="state">
    <v-card class="pa-2">
      <v-card-title> Поиск Клиента из Abacus </v-card-title>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="searchValues.client_ID" type="number" density="compact" clearable label="ID Клиента" />
        </v-col>

        <v-col cols="6">
          <v-text-field v-model="searchValues.credit_ID" density="compact" clearable label="Контракт код" />
        </v-col>

        <v-col cols="3">
          <v-text-field v-model="searchValues.name" clearable density="compact" label="ФИО клиента" />
        </v-col>

        <v-col cols="3">
          <v-text-field v-model="searchValues.passport" density="compact" clearable label="Номер Паспорта" />
        </v-col>

        <v-col cols="3">
          <v-text-field v-model="searchValues.INN" type="number" density="compact" clearable label="ИНН" />
        </v-col>
        <v-col cols="3" class="pb-10">
          <v-btn :loading="loading" block color="success" @click="searchAbacus" :append-icon="mdiSearchWeb">
            Поиск
          </v-btn>
        </v-col>
      </v-row>

      <v-progress-linear v-if="loading" color="success" indeterminate :height="5"></v-progress-linear>

      <v-table v-if="searchResults.length" density="compact">
        <thead>
          <tr>
            <th>Код клиента</th>
            <th>Имя клиента</th>
            <th>Паспорт</th>
            <th>ИНН</th>
            <th>ID Контракта</th>
            <th>Контракт код</th>
            <th>Выдан</th>
            <th>Актив</th>
            <th>Статус</th>
            <th>Офис</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in searchResults" :key="item.name" @click="selectClient(item.customerid)">
            <td>{{ item.customerid }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.passport }}</td>
            <td>{{ item.inn }}</td>
            <td>{{ item.cuaccountid }}</td>
            <td>{{ item.accountnumber }}</td>
            <td>{{ item.issued }}</td>
            <td>{{ item.active }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.branch_name }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {mdiSearchWeb} from '@mdi/js'
import ApiFactory from '../factories/api-factory'

const props = defineProps({
  action: {
    type: Function,
    required: true,
  },
})

const apiClient = ApiFactory.build()
const defaultValues = {
  client_ID: '',
  credit_ID: '',
  name: '',
  passport: '',
  INN: '',
}

const state = ref(false)
const searchResults = ref([])
const loading = ref(false)
const searchValues = ref(defaultValues)

defineExpose({
  openDialog,
})

function openDialog() {
  state.value = true
}

async function searchAbacus() {
  let urlFilterParam = {}
  for (const [key, value] of Object.entries(searchValues.value)) {
    if (value) {
      urlFilterParam[key] = value
    }
  }

  if (Object.keys(urlFilterParam).length) {
    loading.value = true
    searchResults.value = []
    const res = await apiClient.post('/search-abacus-advances/', urlFilterParam)
    searchResults.value = res
    loading.value = false
    if (searchResults.value.length) {
      toastSuccess(`Найдено ${searchResults.value.length} записей`)
    } else {
      toastInfo('Записей не найдено')
    }
  } else {
    toastWarning('Фильтры пусты, пожалуйста введите значения в фильтр')
  }
}

function selectClient(id) {
  state.value = false
  props.action(id)
}
</script>
