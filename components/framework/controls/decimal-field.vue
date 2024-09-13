<template>
  <v-text-field
    :label="field.label" 
    v-model="value" 
    :rules="rules" 
    :disabled="field.read_only" 
    type="number"
    variant="outlined" 
    clearable
  />
</template>

<script setup>
import { inputRules } from '~/common/input-rules'

const props = defineProps({
  field: {
    type: Object,
    default: () => {},
    required: true,
  },
  modelValue: {
    type: [String, Number, undefined],
    default: undefined,
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

const rules = computed(() => {
  const decimalRegex = new RegExp(`^\\d+(\\.\\d{0,${props.field?.decimal_places || 2}})?$`);
  const rules = [];
  if (props.field.required) {
    rules.push(inputRules.required);
  }
  rules.push((value) => {
    if (!value) return true;
    return decimalRegex.test(value) || `Должно быть не более ${props.field?.decimal_places || 2} десятичных знаков.`;
  });
  return rules;
})

</script>
