<template>
    <editForm :dataSource="formData" v-if="formData.isReady && Object.keys(fields).length" :context="context">
      <v-tabs v-model="tab" color="success">
        <v-tab value="forms_report">{{ tabTitle }}</v-tab>
        <v-tab value="forms_address">{{ $t('cardTabName.forms_address') }}</v-tab>
        <v-tab value="forms_request">{{ $t('cardTabName.forms_request') }}</v-tab>
        <v-tab value="forms_call">{{ $t('cardTabName.forms_call') }}</v-tab>
        <v-tab v-if="Object.keys(infoFields).length" value="forms_info">{{ $t('cardTabName.forms_info') }}</v-tab>
      </v-tabs>
  
      <v-window v-model="tab">
        <v-window-item value="forms_report">
          <v-card class="pa-4 ma-2">
            <v-card class="pa-4 ma-2" elevation="2">
              <v-row>
                <v-col cols="12" md="3">
                  <control v-model="fields['name'].value" :field="fields['name']" />
                </v-col>
                <v-col cols="12" md="3">
                  <control v-model="fields['birthday'].value" :field="fields['birthday']" />
                </v-col>
                <v-col cols="12" md="3">
                  <control v-model="fields['gender'].value" :field="fields['gender']" />
                </v-col>
                <v-col cols="12" md="3">
                  <control v-model="fields['client_ID'].value" :field="fields['client_ID']" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3">
                  <control v-model="fields['INN'].value" :field="fields['INN']" />
                </v-col>
                <v-col cols="12" md="3">
                  <control v-model="fields['passport'].value" :field="fields['passport']" />
                </v-col>
                <v-col cols="12" md="3">
                  <control v-model="fields['passport_date'].value" :field="fields['passport_date']" />
                </v-col>
                <v-col cols="12" md="3">
                  <control v-model="fields['passport_details'].value" :field="fields['passport_details']" />
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-4 ma-2" elevation="2">
              <v-row>
                <v-col cols="12" md="4">
                  <control v-model="fields['phone1'].value" :field="fields['phone1']" />
                </v-col>
                <v-col cols="12" md="4">
                  <control v-model="fields['phone2'].value" :field="fields['phone2']" />
                </v-col>
                <v-col cols="12" md="4">
                  <control v-model="fields['phone3'].value" :field="fields['phone3']" />
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-4 ma-2" elevation="2">
              <v-row>
                <v-col cols="12" md="3">
                  <control v-model="fields['branch'].value" :field="fields['branch']" />
                </v-col>
                <v-col cols="12" md="3">
                  <control v-model="fields['family_status'].value" :field="fields['family_status']" />
                </v-col>
                <v-col cols="12" md="3">
                  <control v-model="fields['spouse'].value" :field="fields['spouse']" />
                </v-col>
                <v-col cols="12" md="3">
                  <control v-model="fields['spouse_phone'].value" :field="fields['spouse_phone']" />
                </v-col>
              </v-row>
            </v-card>
          </v-card>
        </v-window-item>

        <v-window-item value="forms_address">
          <v-card class="pa-4 ma-2">
            <v-row no-gutters>
                <v-col cols="12" md="3" >
                    <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
                        {{ $t('customers.address') }}
                    </v-sheet>
                </v-col>

                <client-address v-model="fields['address'].value" />
                
                <v-col cols="12" md="12">
                    <control v-model="fields['address_street'].value" :field="fields['address_street']" />
                </v-col>
                <v-col cols="12" md="3" >
                    <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
                        {{ $t('customers.registration_address') }}
                    </v-sheet>
                </v-col>

                <client-address v-model="fields['registration_address'].value" />

                <v-col cols="12" md="12">
                    <control v-model="fields['registration_address_street'].value" :field="fields['registration_address_street']" />
                </v-col>
            </v-row>
          </v-card>
        </v-window-item>

        <v-window-item value="forms_request">
          <v-card class="pa-4 ma-2" elevation="3">
            <dynamic-data-table
              :tableTitle= "$t('cardTabName.forms_request')"
              modelName="request_credits"
              :can-export="true"
              :columns="[
                {name: 'status.uid'},
                {name: 'status_change_date'},
                {name: 'branch.description'},
                {name: 'created'},
                {name: 'created_by.get_full_name'},
              ]"
              :show-columns="['status.uid', 'status_change_date', 'branch.description', 'created', 'created_by.get_full_name' ]"
              :external-filter="`filter{customer.id}=${primaryKeyValue}`"
              :can-create="false"
              :can-update="true"
              :can-delete="false"
              :selectable="false"
            />
          </v-card>
        </v-window-item>

        <v-window-item value="forms_call">
          <v-card class="pa-4 ma-2" elevation="3">
            <dynamic-data-table
              :tableTitle= "$t('cardTabName.forms_call')"
              modelName="client_decisions"
              :can-export="true"
              :columns="[
                {name: 'created'},
                {name: 'application_receipt_channel'},
                {name: 'client_decision'},
                {name: 'customer_response'},
                {name: 'employee_comments'},
                {name: 'client_refused'},
                {name: 'missed_call'},
                {name: 'active_in_abacus'}
              ]"
              :show-columns="['created', 'application_receipt_channel', 'client_decision', 'customer_response', 'employee_comments', 'client_refused', 'missed_call', 'active_in_abacus' ]"
              :external-filter="`filter{customer.id}=${primaryKeyValue}`"
              :can-create="false"
              :can-update="true"
              :can-delete="false"
              :selectable="false"
            />
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
  import { DataSource } from '~/dataSource/dataSource'
  import control from '~/components/framework/controls/control.vue'
  import editForm from '~/components/framework/forms/edit-form.vue'
  import clientAddress from '~/components/client-address.vue'
  import DynamicDataTable from '~/components/dynamic_table/dynamic-data-table.vue'

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