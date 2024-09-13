<template>
  <v-number-input 
    :label="field.label" 
    v-model="value" 
    :rules="rules" 
    :disabled="field.read_only" 
    control-variant="stacked" 
    variant="outlined" 
    clearable
  />
</template>

<script setup>
import {inputRules} from '~/common/input-rules'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

const props = defineProps({
  field: {
    type: Object,
    default: () => {},
    required: true,
  },
  modelValue: {
    type: [String, Number, undefined],
    default: undefined,
  },
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

const rules = computed(() => {
  if (props.field.required) {
    return [inputRules.required]
  }
  return []
})
</script>
