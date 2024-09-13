<template>
  <v-dialog v-model="dialog">
    <v-card class="pa-2">
      <v-col class="text-right">
        <v-btn width="90" color="error" variant="outlined" @click="dialog = false">Закрыть</v-btn>
      </v-col>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-text-field v-if="info.name" v-model="info.name" label="ФИО клиента" readonly />
          </v-col>
          <v-col cols="2" v-if="info.abacusCustomerId">
            <v-text-field v-model="info.abacusCustomerId" label="ID клиента в Абакусе" readonly />
          </v-col>
          <v-col cols="2" v-if="info.abacusCuAccountId">
            <v-text-field v-model="info.abacusCuAccountId" label="ID кредита в Абакусе" readonly />
          </v-col>
          <v-col cols="4" v-if="info.abacusAccountNumber">
            <v-text-field v-model="info.abacusAccountNumber" label="Коде кредита в Абакусе" readonly />
          </v-col>
          <v-col cols="4" v-if="info.swiftId">
            <v-text-field v-model="info.swiftId" label="ID кредита в Swfit" readonly />
          </v-col>
        </v-row>
      </v-card-text>

      <table-crif :primary-key-value="info.swiftId" />
    </v-card>
  </v-dialog>
</template>

<script setup>
import tableCrif from './table-crif.vue'

const dialog = ref(false)
const info = ref()
const listFilter = ref()

defineExpose({
  openDialog,
})

async function openDialog(i, filter) {
  dialog.value = true
  info.value = {...i}
  listFilter.value = filter
}
</script>
