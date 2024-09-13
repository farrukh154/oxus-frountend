<script setup lang="ts">
import {confirmData} from '~/utils/confirm-dialog'

function onConfirm() {
  confirmData.value.show = false
  confirmData.value.onConfirm()
}

function onCancel() {
  confirmData.value.show = false
  confirmData.value.onCancel()
}
</script>

<template>
  <v-dialog width="20%" v-model="confirmData.show">
    <v-card class="pa-4">
      <v-card-title>
        {{ confirmData.title }}
      </v-card-title>
      <v-card-text>
        {{ confirmData.body }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="success" class="mr-2" @click="onConfirm">
          {{ confirmData.confirmButtonText }}
        </v-btn>
        <v-btn @click="onCancel">
          {{ confirmData.cancelButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
