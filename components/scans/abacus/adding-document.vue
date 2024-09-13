<template>
  <v-dialog v-model="dialog" width="1500">
    <v-card>
      <v-tabs v-model="tab" background-color="primary">
        <v-tab value="main">Главная</v-tab>
        <v-tab value="info">Тех.инфо</v-tab>
      </v-tabs>
      <v-card-text>
        <v-form v-if="formData.isReady" ref="form">
          <v-window v-model="tab">
            <v-window-item value="main">
              <v-row justify="center" align="center">
                <v-col cols="4">
                  <file-input-control
                    v-model="formData.fields.file.value"
                    :field="{rules: [inputRules.fileRules], label: 'Файл', acceptFileFormat: 'application/pdf'}"
                  />
                </v-col>

                <v-col cols="4">
                  <autocompleteField
                    v-model="formData.fields.type.value"
                    :rules="[inputRules.required]"
                    :apiModel="formData.fields.type.related_to"
                    load-all
                    label="Type"
                  />
                </v-col>

                <v-col cols="4">
                  <v-text-field
                    v-model="formData.fields.abacus_id.value"
                    label="abacus id"
                    readonly
                    :rules="[inputRules.required]"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field v-model="formData.fields.description.value" label="Descriptions"> </v-text-field>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item value="info">
              <v-row justify="center" align="center">
                <v-col cols="6">
                  <v-text-field v-model="formData.fields.created.value" label="Created" readonly> </v-text-field>
                </v-col>

                <v-col cols="6">
                  <autocompleteField
                    v-model="formData.fields.created_by.value"
                    :apiModel="formData.fields.created_by.related_to"
                    readonly
                    itemTitle="email"
                    label="Created by"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field v-model="formData.fields.updated.value" label="Updated" readonly />
                </v-col>

                <v-col cols="6">
                  <autocompleteField
                    v-model="formData.fields.updated_by.value"
                    :apiModel="formData.fields.updated_by.related_to"
                    readonly
                    itemTitle="email"
                    label="Update by"
                  />
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-form>
      </v-card-text>

      <v-card-actions style="justify-content: flex-end">
        <v-btn color="blue" @click="save" :loading="saving"> Сохранить </v-btn>
        <v-btn color="red" @click="dialog = false"> Закрыть </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {DataSource} from '~/dataSource/dataSource'
import autocompleteField from '~/components/autocomplete-field.vue'
import {inputRules} from '~/common/input-rules'
const emit = defineEmits(['saved'])
const dialog = ref(false)
const form = ref()
const formData = ref({})
const tab = ref(null)
const saving = ref(false)

defineExpose({
  openAddingDialog,
})

async function openAddingDialog(abacus_id, model, id) {
  dialog.value = true
  formData.value = new DataSource(model, id)
  await formData.value.init()
  formData.value.fields.abacus_id.value = abacus_id
}

const save = async () => {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Заполните все поля')
    return
  }
  saving.value = true
  await formData.value.save()
  saving.value = false
  emit('saved')
  dialog.value = false
}
</script>
