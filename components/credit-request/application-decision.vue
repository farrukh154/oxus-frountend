<template>
  <v-dialog v-model="dialog" persistent width="90%">
    <v-card>
      <v-card-actions>
        <v-spacer />
        <div v-if="formData.isReady" class="pa-4 text-red-lighten-1">
          Статус {{ getUIDFromId(formData.fields.status.value) }}
        </div>
        <v-btn variant="text" @click="dialog = false"> Закрыть </v-btn>
      </v-card-actions>
      <v-form v-if="formData.isReady && clientFormData.isReady" ref="form" class="pa-4">
        <v-sheet class="mx-auto mb-7 mt-1 text-center">
          <h2 class="text-h6 mb-4" style="font-weight: 550">Қарор оид ба аризаи № {{ formData.primaryKeyValue }}</h2>
        </v-sheet>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Санаи қарор
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <div class="pt-4 pl-4">
              {{ getDateTimeStringFromISOString(formData.fields.status_change_date.value) }}
            </div>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Ному насаби Аризадиҳанда
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-text-field v-model="clientFormData.fields.name.value" readonly label="Номи пурра" variant="outlined" />
          </v-col>
        </v-row>

        <v-sheet class="mx-auto mb-7 mt-1 text-center">
          <h2 class="text-h6 mb-4" style="font-weight: 550">1. Тасдиқ гардид</h2>
        </v-sheet>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Маблағи қарз
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-text-field
              v-model="formData.fields.approve_amount.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Маблағ бо ҳарф
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field :value="amountByText" readonly variant="outlined" />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Муҳлати қарз (моҳ)
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="1">
            <v-text-field
              v-model="formData.fields.approve_installment.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Асъори қарз
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="1">
            <autocomplete-field
              v-model="formData.fields.approve_currency_new.value"
              :api-model="formData.fields.approve_currency_new.related_to"
              item-title="description"
              load-all
              :rules="[inputRules.required]"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Меъёри фоиз
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="1">
            <v-text-field
              v-model="formData.fields.approve_interest.value"
              type="number"
              variant="outlined"
              suffix="%"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Давраи имтиёзӣ (моҳ)
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-text-field
              v-model="formData.fields.approve_grace_period.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Маблағи пардохти ҳармоҳа
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-text-field
              readonly
              variant="outlined"
              :value="monthlyPayment"
              :append-inner-icon="mdiCalculatorVariant"
              @click:append-inner="getMonthlyPayment"
            />
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Ҳаққи хизматрасонӣ
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              v-model="formData.fields.approve_issue_fee.value"
              type="number"
              variant="outlined"
              suffix="%"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Мақсади қарз (зергуруҳи мақсад)
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <autocomplete-field
              v-model="formData.fields.credit_purpose.value"
              :api-model="formData.fields.credit_purpose.related_to"
              readonly
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="4" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Категория ва намуди фаъолият
            </v-sheet>
          </v-col>

          <v-col cols="4" sm="4">
            <autocomplete-field
              v-model="formData.fields.economic_activity.value"
              :api-model="formData.fields.economic_activity.related_to"
              readonly
            />
          </v-col>
          <v-col cols="4" sm="4">
            <autocomplete-field
              v-model="formData.fields.economic_activity_type.value"
              :api-model="formData.fields.economic_activity_type.related_to"
              readonly
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Маҳсулоти қарзӣ
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <autocomplete-field
              v-model="formData.fields.credit_product.value"
              :api-model="formData.fields.credit_product.related_to"
              load-all
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Рейтинги скоринг (ОКСУС)
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-select
              v-model="formData.fields.rating_internal.value"
              :items="formData.fields.rating_internal.choices"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              clearable
            />
          </v-col>

          <v-col cols="12" sm="3">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Рейтинги скоринг (беруна)
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-select
              v-model="formData.fields.rating_external.value"
              :items="formData.fields.rating_external.choices"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              clearable
            />
          </v-col>

          <v-col cols="12" sm="1">
            <swift-button :id="formData.fields.id.value" :name="clientFormData.fields.name.value" />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Фоидаи софи моҳона
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              {{ monthlyProfit }}
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="3">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Коэффисиенти карзадокунӣ
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="3">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              {{ coefficient }}
            </v-sheet>
          </v-col>
        </v-row>

        <v-sheet class="mx-auto mb-7 mt-1 text-center">
          <h2 class="text-h6 mb-4" style="font-weight: 550">2. Шартҳои иловагӣ</h2>
        </v-sheet>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Қарз пас аз иҷрои шартҳои зерин дода мешавад
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-select
              v-model="formData.fields.approve_condition.value"
              :items="formData.fields.approve_condition.choices"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              clearable
            />
          </v-col>
        </v-row>

        <v-sheet class="mx-auto mb-7 mt-1 text-center">
          <h2 class="text-h6 mb-4" style="font-weight: 550">3. Рад карда шуд</h2>
        </v-sheet>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Пешниҳоди қарз бо сабабҳои зерин рад карда шуд
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <autocomplete-field
              v-model="formData.fields.rejection_reason.value"
              :api-model="formData.fields.rejection_reason.related_to"
              load-all
              clearable
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-5 pb-5 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Таҳлилгари Қарзӣ
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="4" class="pb-11">
            <v-sheet class="pt-10 pb-2 text-center">
              <v-divider :thickness="1" class="border-opacity-100" color="black"></v-divider>
              Ному насаб
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2" class="pb-11">
            <v-sheet class="pt-10 pb-2 text-center">
              <v-divider :thickness="1" class="border-opacity-100" color="black"></v-divider>
              имзо
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2" class="pb-11">
            <v-sheet class="pt-10 pb-2 text-center">
              <v-divider :thickness="1" class="border-opacity-100" color="black"></v-divider>
              Таърих
            </v-sheet>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-spacer />
          <v-btn color="success" :disabled="!allowChangeDecision" size="x-large" class="mr-2" @click="save">
            Сохранить</v-btn
          >
          <v-btn :disabled="!allowChangeDecision" color="success" size="x-large" class="mr-2" @click="decision">
            Решение принято
          </v-btn>
          <v-btn color="success" size="x-large" @click="print">Печать</v-btn>
        </v-row>
      </v-form>

      <v-form v-if="formData.isReady" ref="postponedForm" class="pa-4">
        <v-sheet class="mx-auto mb-7 mt-1 text-center">
          <h2 class="text-h6 mb-4" style="font-weight: 550">Ба таъхир мондани қабули карор</h2>
        </v-sheet>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Ариза ба сабабҳои зерин ба таъхир гузошта шуд
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-text-field
              v-model="formData.fields.postponed_info.value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-spacer />
          <v-btn :disabled="!allowChangeDecision" color="success" size="x-large" @click="postpone">Отложить</v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {mdiCalculatorVariant} from '@mdi/js'
import {DataSource} from '~/dataSource/dataSource'
import {confirmDialog} from '~/utils/confirm-dialog'
import {getIdFromUID, getUIDFromId, SwiftLoanStatuses} from '~/common/swift-loan'
import ApiFactory from '~/factories/api-factory'
import {inputRules} from '~/common/input-rules'
import SwiftButton from '~/components/crif/swift-button.vue'
import {getDateTimeStringFromISOString} from '~/common/date-conversion'

defineExpose({
  openDialog,
})

const dialog = shallowRef(false)
const formData = ref([])
const clientFormData = ref([])
const amountByText = ref()
const apiClient = ApiFactory.build()
const form = ref()
const postponedForm = ref()
const monthlyPayment = ref()
let timer

async function openDialog(id) {
  dialog.value = true
  formData.value = new DataSource('request_credits', id)
  await formData.value.init()
  clientFormData.value = new DataSource('customers', formData.value.fields.customer.value)
  await clientFormData.value.init()
  if (!formData.value.fields.approve_amount.value) {
    formData.value.fields.approve_amount.value = formData.value.fields.request_amount.value
  }
  if (!formData.value.fields.approve_installment.value) {
    formData.value.fields.approve_installment.value = formData.value.fields.request_installment.value
  }
  if (!formData.value.fields.approve_currency_new.value) {
    formData.value.fields.approve_currency_new.value = formData.value.fields.currency_new.value
  }
  if (!formData.value.fields.approve_grace_period.value && formData.value.fields.approve_grace_period.value !== 0) {
    formData.value.fields.approve_grace_period.value = formData.value.fields.request_grace_period.value
  }
  getMonthlyPayment()
}

async function print() {
  const config = useRuntimeConfig()
  const anchor = document.createElement('a')
  anchor.href = `${config.public.apiBase}/print-protocol/${formData.value.primaryKeyValue}/`
  anchor.target = '_blank'
  anchor.download = `print_protocol_${formData.value.primaryKeyValue}.pdf`
  anchor.click()
}
async function save() {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Заполните все поля')
    return
  }
  await formData.value.save()
}
async function decision() {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Заполните все поля')
    return
  }
  if (formData.value.fields.rejection_reason.value) {
    confirmDialog({
      title: 'Подтверждения',
      body: 'Вы действительно хотите отказать заявке?',
      cancelButtonText: 'Нет',
      confirmButtonText: 'Да',
      onConfirm: decisionDenied,
    })
  } else {
    confirmDialog({
      title: 'Подтверждения',
      body: 'Вы действительно хотите одобрить заявку?',
      cancelButtonText: 'Нет',
      confirmButtonText: 'Да',
      onConfirm: decisionApprove,
    })
  }
}

async function decisionDenied() {
  formData.value.fields.status.value = getIdFromUID(SwiftLoanStatuses.DENIED_UID)
  await formData.value.save()
  toastSuccess('Заявка отклонена')
}
async function decisionApprove() {
  formData.value.fields.status.value = getIdFromUID(SwiftLoanStatuses.APPROVED_UID)
  await formData.value.save()
  toastSuccess('Заявка одобрена')
}
const allowChangeDecision = computed(() => {
  return [getIdFromUID(SwiftLoanStatuses.TO_UNDERWRITER_UID), getIdFromUID(SwiftLoanStatuses.POSTPONED_UID)].includes(
    formData.value.fields.status.value,
  )
})

const monthlyProfit = computed(() => {
  if (!formData.value.fields) {
    return 0
  }
  return (
    Number(formData.value.fields.monthly_income.value ?? 0) -
    Number(formData.value.fields.monthly_household_expenses.value ?? 0) -
    Number(formData.value.fields.monthly_payment_loans.value ?? 0)
  )
})

const coefficient = computed(() => Math.round((monthlyProfit.value / monthlyPayment.value) * 100) / 100)

async function postpone() {
  const valid = await postponedForm.value.validate()
  if (!valid.valid) {
    toastWarning('Заполните все поля')
    return
  }
  formData.value.fields.status.value = getIdFromUID(SwiftLoanStatuses.POSTPONED_UID)
  await formData.value.save()
  toastSuccess('Заявка отложена')
}

watch(
  () => formData.value.fields?.approve_amount?.value,
  async (curr, prev) => {
    clearTimeout(timer)
    timer = window.setTimeout(async () => {
      if (curr) {
        const res = await apiClient.get(`/get-number-in-string/${curr}/`)
        amountByText.value = res.result
      } else {
        amountByText.value = ''
      }
    }, 1000)
  },
)

async function getMonthlyPayment() {
  if (
    formData.value.fields.approve_amount.value &&
    formData.value.fields.approve_installment.value &&
    (formData.value.fields.approve_grace_period.value || formData.value.fields.approve_grace_period.value === 0) &&
    formData.value.fields.approve_interest.value
  ) {
    const res = await apiClient.post('/get-monthly-credit-payment/', {
      amount: formData.value.fields.approve_amount.value,
      term: formData.value.fields.approve_installment.value,
      grace_period: formData.value.fields.approve_grace_period.value,
      interest: formData.value.fields.approve_interest.value,
    })
    monthlyPayment.value = Math.round(res.result * 100) / 100
  } else {
    toastWarning('Не все поля заполнены')
  }
}
</script>
