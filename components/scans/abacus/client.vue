<template>
  <v-dialog v-model="dialog" width="1500">
    <v-card class="pa-5">
      <v-col class="text-right">
        <v-btn width="90" color="error" variant="outlined" @click="dialog = false">Закрыть</v-btn>
      </v-col>
      <v-row>
        <v-col cols="3">
          <v-text-field v-model="selectedId" label="ID клиента" readonly />
        </v-col>

        <v-col cols="5">
          <v-text-field v-model="selectedName" label="ФИО клиента" readonly />
        </v-col>
      </v-row>

      <dynamic-data-table
        tableTitle=""
        modelName="customer_scans"
        :can-export="true"
        :columns="[
          {name: 'created_by.get_full_name', label: 'Created By'},
          {name: 'created', label: 'Created'},
          {name: 'updated_by.get_full_name', label: 'Updated By'},
          {name: 'updated', label: 'Updated'},
          {name: 'description', label: 'Description'},
          {name: 'type.name', label: 'Type'},
          {name: 'file', label: 'File'},
        ]"
        :show-columns="[
          'created_by.get_full_name',
          'created',
          'updated_by.get_full_name',
          'updated',
          'description',
          'type.name',
          'file',
        ]"
        :can-create="false"
        :can-update="false"
        :can-delete="false"
        :selectable="false"
        :external-filter="`filter{abacus_id}=${selectedId}`"
        ref="refreshTable"
      >
        <template v-slot:servicePanel>
          <v-btn color="success" size="small" class="mr-2" @click="openForm()">Добавить</v-btn>
        </template>
        <template v-slot:actions="{item}">
          <v-btn size="small" color="success" @click="openForm(item.id)">изменить</v-btn>
        </template>
      </dynamic-data-table>
    </v-card>
  </v-dialog>
  <AddingDocument @saved="refreshTable.refreshData()" ref="addingDocumentRef" />
</template>

<script setup>
import {ref} from 'vue'
import AddingDocument from '~/components/scans/abacus/adding-document.vue'
import DynamicDataTable from '~/components/dynamic_table/dynamic-data-table.vue'

const dialog = ref(false)
const selectedId = ref()
const selectedName = ref()

defineExpose({
  openDialog,
})

const refreshTable = ref()

function openDialog(id, name) {
  dialog.value = true
  selectedName.value = name
  selectedId.value = id
}

const addingDocumentRef = ref()
function openForm(id) {
  const model = 'customer_scans'
  addingDocumentRef.value.openAddingDialog(selectedId.value, model,id)
}

</script>
