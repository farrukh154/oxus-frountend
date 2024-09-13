<template>
  <v-container id="section-to-print">
    <v-row>
      <v-col cols="3">
        <img src="@/assets/images/brand/logo_tj.png" class="logo" />
      </v-col>
      <v-col cols="9" align-self="end">
        <h1 class="">{{ $t('blacklist.search') }}</h1>
        <!-- <h1 class="">Blacklist search</h1> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" align-self="end">
        <v-text-field
          :label=" $t('blacklist.name')" 
          v-model="searchValue"
          variant="underlined"
          class="pb-0 mb-0 me-0"
          hide-details="auto"
          density="compact"
        ></v-text-field>
      </v-col>
      <v-col cols="3" align-self="end">
        <v-select
          :label=" $t('blacklist.percentage')" 
          hide-details="auto"
          :items="matchPercentageValues"
          variant="underlined"
          v-model="matchPercentageValue"
          density="compact"
        ></v-select>
      </v-col>
      <v-col cols="1" align-self="end">
      {{ $t('blacklist.count') }} <span class="rows_count">{{ rowsCount }}</span>
      </v-col>
      <v-col cols="1" align-self="end">
        <v-btn color="success" class="hide-for-print" @click="search">{{ $t('blacklist.search_btn') }}</v-btn>
      </v-col>
      <v-col cols="1" align-self="end">
        <v-btn :disabled="!tableRows.length" color="success" class="hide-for-print" @click="print">{{ $t('blacklist.print') }}</v-btn>
      </v-col>
    </v-row>
    <br />
    <template v-if="isLoading">Loading...</template>
    <template v-else>
      <v-table class="w-100 elevation-1 black_list_table" density="compact">
        <thead class="black_list_table_head">
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">{{ $t('blacklist.name2') }}</th>
            <th class="text-center">ID</th>
            <th class="text-center">{{ $t('blacklist.birth') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableRows" :key="row.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-left">{{ row.name }}</td>
            <td class="text-center">{{ row.id }}</td>
            <td class="text-center">{{ row.dateb ? row.dateb.split('T')?.[0] : row.dateb }}</td>
          </tr>
        </tbody>
      </v-table>
    </template>
    <br />
    <br />
    <div>
      {{ $t('blacklist.searchdate') }}
     <span class="search_date">{{ searchDate }}</span>
    </div>
    <br />
    <div>
      {{ $t('blacklist.searchedby') }}
      <span class="search_by">{{ searchBy }}</span>
      <span class="signature_placeholder">&nbsp;</span>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import BlackListService from '../services/black-list-service'

const searchValue = ref('')
const matchPercentageValue = ref(100)
const isLoading = ref(false)

const matchPercentageValues = [
  {
    title: '30%',
    value: 30,
  },
  {
    title: '40%',
    value: 40,
  },
  {
    title: '50%',
    value: 50,
  },
  {
    title: '60%',
    value: 60,
  },
  {
    title: '70%',
    value: 70,
  },
  {
    title: '80%',
    value: 80,
  },
  {
    title: '90%',
    value: 90,
  },
  {
    title: '95%',
    value: 95,
  },
  {
    title: '100%',
    value: 100,
  },
]

const searchDate = ref('')
const searchBy = ref('')
const tableRows = ref([])
const rowsCount = ref(0)

const blackListService = new BlackListService()

const search = async () => {
  if (searchValue.value === '') {
    emptyTable()
  }
  if (searchValue.value.length < 3) {
    return
  }
  emptyTable()
  isLoading.value = true
  try {
    let response = await blackListService.search(searchValue.value, matchPercentageValue.value)
    if (response.result) {
      tableRows.value = response.result
      rowsCount.value = response.result.length
      searchDate.value = response.current_datetime
      searchBy.value = response.user
    } else {
      tableRows.value = []
      rowsCount.value = 0
    }
    isLoading.value = false
  } catch (e) {
    isLoading.value = false
  }
}

const emptyTable = () => {
  tableRows.value = []
  rowsCount.value = 0
}

function print() {
  window.print()
}
</script>

<style scoped>
.black_list_table .black_list_table_head {
  background-color: #6396ef;
}
.black_list_table .black_list_table_head th {
  font-weight: bold !important;
}

.black_list_table th + th {
  border-left: 1px solid #dddddd;
}
.black_list_table td + td {
  border-left: 1px solid #dddddd;
}

.search_by,
.search_date,
.signature_placeholder,
.rows_count {
  border-bottom: 1px solid #333;
}
.search_by {
  display: inline-block;
  width: 60%;
  margin-right: 10px;
}
.signature_placeholder {
  display: inline-block;
  width: 20%;
}
.logo {
  max-height: 100px;
}
td {
  height: 13px !important;
  font-size: 10px;
}
</style>

<style>
@media print {
  body {
    visibility: hidden;
  }
  .hide-for-print {
    visibility: hidden;
  }
  #section-to-print {
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
