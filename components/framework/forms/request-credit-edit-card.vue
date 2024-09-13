<template>
  <editForm :dataSource="formData" v-if="formData.isReady && Object.keys(fields).length" :context="context">
    <div style="text-align: right" class="mt-1 mb-2">
      <v-btn color="success" class="mr-2" @click="print('print-request-credits', 'request_credit')">
        {{ $t('card.request_credits') }}
      </v-btn>
      <v-btn color="success" class="mr-2" @click="print('print-declaration', 'declaration')">
        {{ $t('card.declaration') }}
      </v-btn>
      <v-btn color="success" class="mr-2" @click="print('print-protocol', 'protocol')">
        {{ $t('card.protocol') }}
      </v-btn>
      <v-btn color="success" class="mr-2" @click="print('print-order', 'order')">
        {{ $t('card.order') }}
      </v-btn>
    </div>

    <v-tabs v-model="tab" color="success">
      <v-tab value="forms_report">{{ tabTitle }}</v-tab>
      <v-tab value="forms_info_credit">{{ $t('cardTabName.forms_info_credit') }}</v-tab>
      <v-tab value="forms_other_data">{{ $t('cardTabName.forms_other_data') }}</v-tab>
      <v-tab value="forms_credit_scoring">{{ $t('cardTabName.forms_credit_scoring') }} </v-tab>
      <v-tab v-if="Object.keys(infoFields).length" value="forms_info">{{ $t('cardTabName.forms_info') }}</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="forms_report">
        <v-card class="pa-4 ma-2" elevation="2">
          <v-row>
            <v-col cols="12" md="3">
              <control v-model="fields['id'].value" :field="fields['id']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['customer'].value" :field="fields['customer']" readonly />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['created'].value" :field="fields['created']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['created_by'].value" :field="fields['created_by']" disableOpenCard />
            </v-col>
          </v-row>
        </v-card>

        <v-card class="pa-5 ma-2" elevation="2">
          <v-row>
            <v-col cols="12" md="4">
              <control v-model="fields['status'].value" :field="fields['status']" disableOpenCard loadAll />
            </v-col>
            <v-col cols="12" md="4">
              <control v-model="fields['status_change_date'].value" :field="fields['status_change_date']" />
            </v-col>
            <v-col cols="12" md="4">
              <control v-model="fields['status_change_by'].value" :field="fields['status_change_by']" disableOpenCard />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <control
                v-model="fields['underwriter_status'].value"
                :field="fields['underwriter_status']"
                disableOpenCard
                loadAll
              />
            </v-col>
            <v-col cols="12" md="4">
              <control
                v-model="fields['underwriter_status_change_date'].value"
                :field="fields['underwriter_status_change_date']"
              />
            </v-col>
            <v-col cols="12" md="4">
              <control
                v-model="fields['underwriter_status_change_by'].value"
                :field="fields['underwriter_status_change_by']"
                disableOpenCard
              />
            </v-col>
          </v-row>
        </v-card>

        <v-card class="pa-4 ma-2" elevation="2">
          <v-row>
            <v-col cols="12" md="3">
              <control v-model="fields['result'].value" :field="fields['result']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['decision_client'].value" :field="fields['decision_client']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['rating_internal'].value" :field="fields['rating_internal']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['rating_external'].value" :field="fields['rating_external']" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <control v-model="fields['approve_condition'].value" :field="fields['approve_condition']" />
            </v-col>
            <v-col cols="12" md="3">
              <control
                v-model="fields['rejection_reason'].value"
                :field="fields['rejection_reason']"
                disableOpenCard
                loadAll
              />
            </v-col>
            <v-col cols="12" md="3">
              <control
                v-model="fields['client_rejection_reason'].value"
                :field="fields['client_rejection_reason']"
                loadAll
                disableOpenCard
              />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['postponed_info'].value" :field="fields['postponed_info']" />
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

      <v-window-item value="forms_info_credit">
        <v-card class="pa-4 ma-2" elevation="2">
          <v-row>
            <v-col cols="12" md="3">
              <control v-model="fields['credit_ID'].value" :field="fields['credit_ID']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['branch'].value" :field="fields['branch']" disableOpenCard />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['credit_product'].value" :field="fields['credit_product']" disableOpenCard />
            </v-col>
            <v-col cols="12" md="3">
              <control
                v-model="fields['credit_purpose'].value"
                :field="fields['credit_purpose']"
                loadAll
                disableOpenCard
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <control v-model="fields['investment_sector'].value" :field="fields['investment_sector']" />
            </v-col>
            <v-col cols="12" md="3">
              <control
                v-model="fields['economic_activity'].value"
                :field="fields['economic_activity']"
                loadAll
                disableOpenCard
              />
            </v-col>
            <v-col cols="12" md="3">
              <control
                v-model="fields['economic_activity_type'].value"
                :field="fields['economic_activity_type']"
                :parent-filter-id="fields['economic_activity'].value"
                parent-filter-name="economic_activity"
                loadAll
                disableOpenCard
              />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['information_source'].value" :field="fields['information_source']" />
            </v-col>
          </v-row>
        </v-card>

        <v-card class="pa-4 ma-2" elevation="2">
          <v-row>
            <v-col cols="12" md="3">
              <control v-model="fields['request_amount'].value" :field="fields['request_amount']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['currency_new'].value" :field="fields['currency_new']" loadAll disableOpenCard />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['request_installment'].value" :field="fields['request_installment']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['request_grace_period'].value" :field="fields['request_grace_period']" />
            </v-col>
          </v-row>
        </v-card>

        <v-card class="pa-4 ma-2" elevation="2">
          <v-row>
            <v-col cols="12" md="3">
              <control v-model="fields['approve_amount'].value" :field="fields['approve_amount']" />
            </v-col>
            <v-col cols="12" md="3">
              <control
                v-model="fields['approve_currency_new'].value"
                :field="fields['approve_currency_new']"
                loadAll
                disableOpenCard
              />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['approve_installment'].value" :field="fields['approve_installment']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['approve_grace_period'].value" :field="fields['approve_grace_period']" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <control v-model="fields['approve_interest'].value" :field="fields['approve_interest']" />
            </v-col>
            <v-col cols="12" md="6">
              <control v-model="fields['approve_issue_fee'].value" :field="fields['approve_issue_fee']" />
            </v-col>
          </v-row>
        </v-card>
      </v-window-item>

      <v-window-item value="forms_other_data">
        <v-card class="pa-4 ma-2" elevation="2">
          <v-row>
            <v-col cols="12" md="3">
              <control v-model="fields['family_number'].value" :field="fields['family_number']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['family_number_has_income'].value" :field="fields['family_number_has_income']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['current_debt'].value" :field="fields['current_debt']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['current_debt_name'].value" :field="fields['current_debt_name']" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <control v-model="fields['acted'].value" :field="fields['acted']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['full_time_employees'].value" :field="fields['full_time_employees']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['new_job'].value" :field="fields['new_job']" />
            </v-col>
            <v-col cols="12" md="3">
              <control v-model="fields['work_experience'].value" :field="fields['work_experience']" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <control v-model="fields['activity_location'].value" :field="fields['activity_location']" />
            </v-col>
            <v-col cols="12" md="4">
              <control v-model="fields['education'].value" :field="fields['education']" />
            </v-col>
            <v-col cols="12" md="4">
              <control v-model="fields['education_info'].value" :field="fields['education_info']" />
            </v-col>
          </v-row>
        </v-card>

        <v-card class="pa-4 ma-2" elevation="2">
          <v-row>
            <v-col cols="8" md="4">
              <control v-model="fields['monthly_income'].value" :field="fields['monthly_income']" />
            </v-col>
            <v-col cols="8" md="8">
              <control v-model="fields['monthly_income_info'].value" :field="fields['monthly_income_info']" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" md="4">
              <control
                v-model="fields['monthly_household_expenses'].value"
                :field="fields['monthly_household_expenses']"
              />
            </v-col>
            <v-col cols="8" md="8">
              <control
                v-model="fields['monthly_household_expenses_info'].value"
                :field="fields['monthly_household_expenses_info']"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" md="4">
              <control v-model="fields['monthly_payment_loans'].value" :field="fields['monthly_payment_loans']" />
            </v-col>
            <v-col cols="8" md="8">
              <control
                v-model="fields['monthly_payment_loans_info'].value"
                :field="fields['monthly_payment_loans_info']"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" md="4">
              <control v-model="fields['total_business_assets'].value" :field="fields['total_business_assets']" />
            </v-col>
            <v-col cols="8" md="8">
              <control
                v-model="fields['total_business_assets_info'].value"
                :field="fields['total_business_assets_info']"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" md="4">
              <control v-model="fields['client_capital'].value" :field="fields['client_capital']" />
            </v-col>
            <v-col cols="8" md="8">
              <control v-model="fields['client_capital_info'].value" :field="fields['client_capital_info']" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" md="4">
              <control v-model="fields['total_household_assets'].value" :field="fields['total_household_assets']" />
            </v-col>
            <v-col cols="8" md="8">
              <control
                v-model="fields['total_household_assets_info'].value"
                :field="fields['total_household_assets_info']"
              />
            </v-col>
          </v-row>
          <v-row style="justify-content: center">
            <v-col cols="12" md="8">
              <control v-model="fields['monthly_profit_info'].value" :field="fields['monthly_profit_info']" />
            </v-col>
          </v-row>
        </v-card>
      </v-window-item>

      <v-window-item value="forms_credit_scoring">
        <v-card class="pa-4 ma-2" elevation="3">
          <table-crif :primary-key-value="primaryKeyValue" />
        </v-card>
      </v-window-item>
    </v-window>
  </editForm>

  <div v-else class="d-flex justify-center align-center" style="height: 100vh">
    <v-progress-circular indeterminate color="white"></v-progress-circular>
  </div>
</template>

<script setup>
import {DataSource} from '~/dataSource/dataSource'
import control from '~/components/framework/controls/control.vue'
import editForm from '~/components/framework/forms/edit-form.vue'
import tableCrif from '~/components/crif/table-crif.vue'

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

async function print(url, dwnName) {
  const config = useRuntimeConfig()
  const anchor = document.createElement('a')
  anchor.href = `${config.public.apiBase}/${url}/${props.primaryKeyValue}/`
  anchor.target = '_blank'
  anchor.download = `${dwnName}_${props.primaryKeyValue}.pdf`
  anchor.click()
}

onMounted(async () => {
  formData.value = new DataSource(props.apiModel, props.primaryKeyValue)
  await formData.value.init()
  fields.value = formData.value.fields
  if (props.primaryKeyValue) {
    tabTitle.value = `${formData.value.verboseName}: ${props.primaryKeyValue}`
  } else {
    tabTitle.value = `${formData.value.verboseName}`
  }
  formData.value.fields.customer.read_only = true

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

watch(
  () => formData.value?.fields?.economic_activity?.value,
  (curr, prev) => {
    if (
      formData.value?.fields?.economic_activity?.value &&
      formData.value.fields?.economic_activity?.value != formData.value.fields?.economic_activity?.oldValue
    ) {
      formData.value.fields.economic_activity_type.value = undefined
    }
  },
)

</script>

<style scoped></style>
