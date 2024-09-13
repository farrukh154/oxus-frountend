<template>
  <v-btn color="info" size="x-large" @click="openCreditDialog">CRIF</v-btn>
  <dialog-crif ref="dialogCrifRef" />
</template>

<script setup>
import dialogCrif from '~/components/crif/dialog-crif.vue'

const dialogCrifRef = ref()
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
})

function openCreditDialog() {
  dialogCrifRef.value.openDialog({
    swiftId: props.id,
    name: props.name,
  })
}
</script>
