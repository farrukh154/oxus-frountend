<template>
  <v-select 
    :label="field.label" 
    v-model="value" 
    :rules="rules" 
    :disabled="field.read_only" 
    :items="choices" 
    item-title="display_name"
    item-value="value" 
    variant="outlined" 
    clearable 
  />
</template>

<script setup>
import {inputRules} from '~/common/input-rules'

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

const choices = computed(() => props.field.choices || [])
</script>