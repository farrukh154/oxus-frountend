<template>
  <v-menu v-model="calendarState" :close-on-content-click="false">
    <template v-slot:activator="{props}">
      <v-text-field v-model="textValue" :label="label" placeholder="Дата ДД.ММ.ГГГГ" clearable :rules="rules">
        <template v-slot:append-inner>
          <v-btn v-bind="props" variant="text" icon><v-icon :icon="mdiCalendarMonth" /></v-btn>
        </template>
      </v-text-field>
    </template>
    <v-card>
      <v-date-picker show-adjacent-months v-model="value" @update:model-value="calendarState = false" />
    </v-card>
  </v-menu>
</template>

<script setup>
import {mdiCalendarMonth} from '@mdi/js'
import {tryDateStringToDate, dateToDateString, dateStringToIsoDateString} from '~/common/date-conversion'
import {useDayjs} from '#dayjs'

const props = defineProps(['modelValue', 'rules', 'label'])
const emit = defineEmits(['update:modelValue'])

const dayjs = useDayjs()

const calendarState = shallowRef(false)

const value = computed({
  get() {
    return new Date(props.modelValue)
  },
  set(value) {
    emit('update:modelValue', new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().slice(0, 10))
  },
})

const textValue = computed({
  get() {
    if (props.modelValue) {
      return dateToDateString(dayjs(props.modelValue))
    }
  },
  set(value) {
    if (tryDateStringToDate(value)) {
      emit('update:modelValue', dateStringToIsoDateString(value))
    } else if (!value) {
      emit('update:modelValue', undefined)
    }
  },
})
</script>
