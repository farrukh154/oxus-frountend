<template>
  <v-card>
    <v-tabs v-model="currentTab" bg-color="#e3e3e3">
      <v-tab
        v-for="category in uniqueCategories"
        :key="category"
        @click="filterReportsByCategory(category)"
        :value="category"
      >
        {{ category }}
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="currentTab">
        <v-window-item v-for="rep in uniqueCategories" :key="rep" :value="rep">
          <v-container fluid>
            <v-row>
              <template v-for="rep in filteredReports">
                <v-col v-if="can('reports', rep.uid)" :key="rep.id" cols="12" md="4">
                  <v-card style="height: 100px" @click="openReport(rep.uid)">
                    <v-card-title class="headline">
                      {{ rep.report_name }}
                    </v-card-title>
                    <v-card-text>
                      {{ rep.description }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import ApiFactory from '../factories/api-factory'
import {can} from '~/common/ability'

const apiClient = ApiFactory.build()
const report = ref([])
const currentTab = ref('')
const uniqueCategories = ref()

const getData = async () => {
  const res = await apiClient.get('/reports/reports')
  report.value = res.reports
  uniqueCategories.value = [...new Set(report.value.map((report) => report.category))]
  currentTab.value = uniqueCategories.value?.[0]
}

onMounted(async () => {
  getData()
})

function filterReportsByCategory(category) {
  currentTab.value = category
}

const filteredReports = computed(() => {
  return currentTab.value ? report.value.filter((rep) => rep.category === currentTab.value) : report.value
})

function openReport(url) {
  const router = useRouter()
  router.push({path: `reports/${url}`})
}
</script>
