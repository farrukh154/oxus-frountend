<template>
  <v-dialog v-model="dialog" persistent max-width="90%">
    <v-card>
      <v-card-title>
        <span class="headline">{{ props.headline }}</span>
      </v-card-title>

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
                  <v-text-field v-model="formData.fields.name.value" label="Name" />
                </v-col>
                <v-col cols="4">
                  <autocompleteField
                    v-model="formData.fields.status.value"
                    apiModel="helpdesk_statuses"
                    title="Status"
                    label="Status"
                    :rules="[inputRules.required]"
                  >
                  </autocompleteField>
                </v-col>
                <v-col cols="4">
                  <autocompleteField
                    v-model="formData.fields.priority.value"
                    apiModel="helpdesk_priorities"
                    label="Priority"
                    title="Priority"
                    :rules="[inputRules.required]"
                  >
                  </autocompleteField>
                </v-col>
                <v-col cols="4">
                  <autocompleteField
                    v-model="formData.fields.branch.value"
                    apiModel="branches"
                    itemTitle="name"
                    title="Branch"
                    label="Branch"
                  >
                  </autocompleteField>
                </v-col>
                <v-col cols="4">
                  <autocompleteField
                    v-model="formData.fields.for_whom.value"
                    apiModel="users"
                    itemTitle="email"
                    title="for_whom"
                    label="For whom"
                  >
                  </autocompleteField>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="formData.fields.description.value" title="description" label="Descriptions">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item value="info">
              <v-row justify="center" align="center">
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.fields.created.value"
                    title="created"
                    label="Created"
                    :readonly="true"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.fields.updated.value"
                    title="updated"
                    label="Updated"
                    :readonly="true"
                  />
                </v-col>
                <v-col cols="6">
                  <autocompleteField
                    v-model="formData.fields.created_by.value"
                    apiModel="users"
                    :readonly="true"
                    itemTitle="email"
                    title="created_by"
                    label="Created by"
                  >
                  </autocompleteField>
                </v-col>
                <v-col cols="6">
                  <autocompleteField
                    v-model="formData.fields.updated_by.value"
                    apiModel="users"
                    :readonly="true"
                    itemTitle="email"
                    title="updated_by"
                    label="Update by"
                  >
                  </autocompleteField>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-form>
      </v-card-text>

      <v-card-actions style="justify-content: flex-end">
        <v-btn color="blue" @click="save"> Сохранить </v-btn>
        <v-btn color="red" @click="dialog = false"> Закрыть </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from 'vue'
import ApiFactory from '../factories/api-factory'
import autocompleteField from '~/components/autocomplete-field.vue'
import {DataSource} from '~/dataSource/dataSource'
import {inputRules} from '~/common/input-rules'

const props = defineProps(['headline'])
const emit = defineEmits(['saved'])

defineExpose({
  openDialog,
})

const apiClient = ApiFactory.build()
const tab = ref(null)
const dialog = ref(false)

const formData = ref({})
const form = ref()

async function findHelpdeskPriority() {
  try {
    let res = await apiClient.get('/helpdesk/helpdesk_priorities?filter{uid}=MEDIUM')
    return res.helpdesk_priorities[0].id
  } catch (error) {
    toastWarning('Ошибка при поиске:', error)
    return null
  }
}

async function findHelpdeskStatus() {
  try {
    let res = await apiClient.get('/helpdesk/helpdesk_statuses?filter{uid}=OPEN')
    return res.helpdesk_statuses[0].id
  } catch (error) {
    toastWarning('Ошибка при поиске:', error)
    return null
  }
}

async function openDialog(id) {
  dialog.value = true
  formData.value = new DataSource('helpdesks', id)
  await formData.value.init()
  const priority = await findHelpdeskPriority()
  const status = await findHelpdeskStatus()
  formData.value.fields.priority.value = priority
  formData.value.fields.status.value = status
}

const save = async () => {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Заполните все поля')
    return
  }
  await formData.value.save()
  emit('saved')
  dialog.value = false
}
</script>