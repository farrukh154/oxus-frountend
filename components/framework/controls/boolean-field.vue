<template>
    <v-checkbox :label="field.label" v-model="value" color="primary" :disabled="field.read_only" />
  </template>
  
  <script setup>

  const props = defineProps({
    field: {
      type: Object,
      default: () => {},
      required: true,
    },
    modelValue: {
      type: [Boolean, undefined],
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
  
  </script>
  