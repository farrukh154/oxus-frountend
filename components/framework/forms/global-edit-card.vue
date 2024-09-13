<template>
  <component
    :is="currentComponent"
    :apiModel="apiModel"
    :primaryKeyValue="primaryKeyValue"
    :context="context"
  ></component>
</template>

<script setup>
import requestCreditEditCard from './request-credit-edit-card.vue'
import standardEditCard from './standard-edit-card.vue'
import customerEditCard from './customer-edit-card.vue'

const props = defineProps({
  apiModel: {
    type: String,
    required: true,
  },
  primaryKeyValue: {
    type: Number,
    required: false,
  },
  context: {
    type: Object,
    required: true,
  },
})

const currentComponent = computed(() => {
  if (props.apiModel === 'request_credits') {
    return requestCreditEditCard
  }
  if (props.apiModel === 'customers') {
    return customerEditCard
  }
  return standardEditCard
})
</script>
