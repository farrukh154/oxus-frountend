<template>
  <div>
    <v-menu v-model="dateMenuState" :close-on-content-click="false" >
      <template v-slot:activator="{ props }">
        <v-text-field
          v-model="textValue"
          :label="field.label"
          :disabled="field.read_only"
          placeholder="Дата и время ДД.ММ.ГГГГ ЧЧ:ММ"
          clearable
          :rules="rules"
          variant="outlined"
        >
          <template v-slot:append-inner>
            <v-btn v-bind="props" variant="text" icon >
              <v-icon :icon="mdiCalendarClock" />
            </v-btn>
          </template>
        </v-text-field>
      </template>
      <v-card>
        <v-row>
          <v-col cols="6">
            <v-date-picker v-model="dateValue" show-adjacent-months @update:model-value="onDateChange" />
          </v-col>
          <v-col cols="6">
            <v-time-picker v-model="timeValue" format="24hr" @update:model-value="onTimeChange" />
          </v-col>
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import {  mdiCalendarClock } from '@mdi/js'
import { tryDateStringToDate, dateToDateString, dateStringToIsoDateString } from '~/common/date-conversion'
import { useDayjs } from '#dayjs'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

const props = defineProps(['modelValue', 'rules', 'label', 'field'])
const emit = defineEmits(['update:modelValue'])

const dayjs = useDayjs()

const dateMenuState = shallowRef(false)

const dateValue = ref(new Date(props.modelValue))
const timeValue = ref(dayjs(props.modelValue).format('HH:mm'))

const textValue = computed({
  get() {
    if (props.modelValue) {
      return `${dateToDateString(dayjs(props.modelValue))} ${dayjs(props.modelValue).format('HH:mm')}`
    }
  },
  set(value) {
    const [datePart, timePart] = value.split(' ')
    if (tryDateStringToDate(datePart) && timePart) {
      const dateTimeString = `${datePart}T${timePart}:00.000Z`
      emit('update:modelValue', dateStringToIsoDateString(dateTimeString))
    } else if (!value) {
      emit('update:modelValue', undefined)
    }
  },
})

const onDateChange = (newDate) => {
  const dateTime = `${dayjs(newDate).format('YYYY-MM-DD')}T${timeValue.value}:00.000Z`
  dateValue.value = newDate;
  emit('update:modelValue', dateTime)
}

const onTimeChange = (newTime) => {
  const dateTime = `${dayjs(dateValue.value).format('YYYY-MM-DD')}T${newTime}:00.000Z`
  timeValue.value = newTime;
  emit('update:modelValue', dateTime)
}

</script>
