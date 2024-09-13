<template>
  <editForm :dataSource="formData" v-if="formData.isReady" :context="context">
    <v-tabs v-model="tab" color="success">
      <v-tab value="forms_report">{{ tabTitle }}</v-tab>
      <v-tab v-if="Object.keys(infoFields).length" value="forms_info">Техническая Информация</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="forms_report">
        <v-card class="pa-4 ma-2">
          <v-row>
            <v-col v-for="(field, key) in reportFields" :key="key" cols="12" md="3">
              <control v-model="reportFields[key].value" :field="field" disableOpenCard />
            </v-col>
          </v-row>
        </v-card>
      </v-window-item>
      <v-window-item value="forms_info">
        <v-card class="pa-4 ma-2">
          <v-row>
            <v-col v-for="(field, key) in infoFields" :key="key" cols="12" md="3">
              <control v-model="infoFields[key].value" :field="field" disableOpenCard />
            </v-col>
          </v-row>
        </v-card>
      </v-window-item>
    </v-window>
  </editForm>

  <div v-else class="text-center mt-5">
    <v-progress-circular indeterminate color="success"></v-progress-circular>
  </div>
</template>

<script setup>
import {DataSource} from '~/dataSource/dataSource'
import control from '~/components/framework/controls/control.vue'
import editForm from '~/components/framework/forms/edit-form.vue'

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

const formData = ref([])
const fields = ref({})
const reportFields = ref({})
const infoFields = ref({})
const tab = ref(null)
const tabTitle = ref('')

onMounted(async () => {
  formData.value = new DataSource(props.apiModel, props.primaryKeyValue)
  await formData.value.init()
  fields.value = formData.value.fields

  if (props.primaryKeyValue) {
    tabTitle.value = `${formData.value.verboseName}: ${props.primaryKeyValue}`
  } else {
    tabTitle.value = `${formData.value.verboseName}`
  }

  Object.entries(fields.value).forEach(([key, field]) => {
    if (key === 'id') {
      return
    }
    if (['created', 'updated', 'created_by', 'updated_by'].includes(key)) {
      infoFields.value[key] = field
    } else {
      reportFields.value[key] = field
    }
  })
})
</script>
