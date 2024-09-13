<template>
  <div class="pa-4 text-h4" align="center">{{ stopWatchSeconds }}:{{ stopWatchTens }}</div>

  <dynamic-data-table
      tableTitle=""
      modelName="reporthistories"
      :can-export="true"
      :columns="[
        {name: 'created', label: 'Дата'},
        {name: 'generated_by.get_full_name', label: 'Пользователь'},
        {name: 'info', label: 'Информация'},
        {name: 'duration', label: 'Длительность формирования отчёта'},
        {name: 'xlsx_report', label: 'Отчёт'},
      ]"
      :show-columns="['created', 'generated_by.get_full_name', 'info', 'duration', 'xlsx_report' ]"
      :can-create="false"
      :can-update="false"
      :can-delete="false"
      :selectable="false"
      :external-filter="`filter{report.uid}=${reportType}`"
      ref="refreshTable"
    />

</template>

<script setup>
import DynamicDataTable from '~/components/dynamic_table/dynamic-data-table.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  reportType: {
    type: String,
    required: true,
  },
})

const tens = ref(0)
const seconds = ref(0)
const Interval = ref()
const refreshTable = ref()

watch(
  () => props.loading,
  (curr, prev) => {
    if (props.loading) {
      tens.value = 0
      seconds.value = 0
      clearInterval(Interval.value)
      Interval.value = setInterval(startTimer, 10)
    } else {
      clearInterval(Interval.value)
      refreshTable.value.refreshData()
    }
  },
)

function startTimer() {
  tens.value++
  if (tens.value > 99) {
    seconds.value++
    tens.value = 0
  }
}

const stopWatchTens = computed(() => (tens.value < 10 ? `0${tens.value}` : tens.value))
const stopWatchSeconds = computed(() => (seconds.value < 10 ? `0${seconds.value}` : seconds.value))

</script>
