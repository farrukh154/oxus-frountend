<template>
  <component :is="componentType" v-model="value" :field="extendedField" />
</template>

<script setup>
import integerField from './integer-field.vue'
import stringField from './string-field.vue'
import choiceField from './choice-field.vue'
import decimalField from './decimal-field.vue'
import datetimeField from './datetime-field.vue'
import dateFiled from './date-filed.vue'
import oneField from './one-field.vue'
import fileField from './file-field.vue'
import booleanField from './boolean-field.vue'

const props = defineProps({
  modelValue: [Number, String, Date, Boolean, undefined],
  field: Object,
  loadAll: {
    type: Boolean,
    default: false,
  },
  disableOpenCard: {
    type: Boolean,
    default: false,
  },
  parentFilterName: {
    type: String,
    default: '',
  },
  parentFilterId: {
    type: [Number, Boolean],
    default: 0,
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const componentMap = {
  integer: integerField,
  string: stringField,
  choice: choiceField,
  decimal: decimalField,
  datetime: datetimeField,
  date: dateFiled,
  one: oneField,
  'file upload': fileField,
  boolean: booleanField,
  field: stringField,
  email: stringField,
}

const componentType = computed(() => componentMap[props.field.type])

const extendedField = computed(() => ({
  ...props.field,
  loadAll: props.loadAll,
  disableOpenCard: props.disableOpenCard,
  parentFilterName: props.parentFilterName,
  parentFilterId: props.parentFilterId,
}))
</script>
