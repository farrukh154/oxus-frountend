<template>
  <v-dialog v-model="dialog" persistent width="auto">
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
          <h2 class="text-h6 mb-4" style="font-weight: 550">
            Эъломия оид ба дархости қарз №
            {{ formData.primaryKeyValue }}
          </h2>
        </v-sheet>
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
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Намуди Фаъолият
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <autocomplete-field
              v-model="formData.fields.economic_activity_type.value"
              :api-model="formData.fields.economic_activity_type.related_to"
              load-all
              readonly
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Суроғаи ҷойгиршавии фаъолият
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="formData.fields.activity_location.value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2"> Таҳсилот </v-sheet>
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              v-model="formData.fields.education.value"
              :items="formData.fields.education.choices"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field v-model="formData.fields.education_info.value" variant="outlined" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-6">
            <v-sheet
              rounded
              class="text-center text-black"
              elevation="3"
              style="display: flex; justify-content: center; height: 80px; align-items: center"
            >
              Маълумоти молиявӣ
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="3" class="pb-2">
            <v-sheet
              rounded
              class="text-center text-black"
              elevation="3"
              style="display: flex; justify-content: center; height: 80px; align-items: center"
            >
              Нишондиҳандаҳо барои як моҳ бо сомони
            </v-sheet>
          </v-col>
          <v-col cols=" 12" sm="5" class="pb-2">
            <v-sheet
              rounded
              class="text-center text-black"
              elevation="3"
              style="display: flex; justify-content: center; height: 80px; align-items: center"
            >
              Шарҳу эзоҳ
            </v-sheet>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet
              rounded
              color="#d9d9d9"
              class="pt-4 pb-3 text-center text-black"
              elevation="2"
              style="display: flex; justify-content: center; align-items: center"
            >
              Даромади моҳона (музди меҳнат, соҳибкори ва ғ.)
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="formData.fields.monthly_income.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field v-model="formData.fields.monthly_income_info.value" variant="outlined" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Хароҷоти моҳонаи хонавода
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="formData.fields.monthly_household_expenses.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field v-model="formData.fields.monthly_household_expenses_info.value" variant="outlined" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet
              rounded
              color="#d9d9d9"
              class="pt-4 pb-3 text-center text-black"
              elevation="2"
              style="display: flex; justify-content: center; align-items: center"
            >
              Пардохти моҳонаи қарзҳои мувозӣ (агар бошад)
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="formData.fields.monthly_payment_loans.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field v-model="formData.fields.monthly_payment_loans_info.value" variant="outlined" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Фоидаи софи моҳона
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="3">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              {{ monthlyProfit }}
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field v-model="formData.fields.monthly_profit_info.value" variant="outlined" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Ҳаҷми умумии дороиҳои тиҷорат
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="formData.fields.total_business_assets.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field v-model="formData.fields.total_business_assets_info.value" variant="outlined" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Сармояи худи мизоҷ
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="formData.fields.client_capital.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field v-model="formData.fields.client_capital_info.value" variant="outlined" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet
              rounded
              color="#d9d9d9"
              class="pt-4 pb-3 text-center text-black"
              elevation="2"
              style="display: flex; justify-content: center; align-items: center"
            >
              Ҳаҷми умумии дороиҳои хонавода (амволи ғайриманқул, таҷҳизот, нақлиёт ва ғ.)
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="formData.fields.total_household_assets.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field v-model="formData.fields.total_household_assets_info.value" variant="outlined" />
          </v-col>
        </v-row>
        <v-sheet class="mx-auto mb-7 mt-1 text-center">
          <h3 class="text-h6 mb-4">
            Тасдиқ мекунам, ки тамоми маълумоти дар эъломияи мазкур дарҷёфта аз гуфтаҳои ман навишта шуда, пурра ва
            дуруст мебошад.
          </h3>
        </v-sheet>
        <v-row>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-5 pb-5 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Аризадиҳанда
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
        <v-row>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-5 pb-5 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Мутахассис оид ба хизматрасонӣ
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
          <v-btn :disabled="!allowSave" color="success" size="x-large" class="mr-2" @click="save"> Сохранить</v-btn>
          <v-btn
            :disabled="!allowSendUnderwriter"
            color="success"
            size="x-large"
            class="mr-2"
            @click="sendToUnderwriter"
          >
            Отправить Андерайтеру
          </v-btn>
          <v-btn color="success" size="x-large" @click="print">Печать</v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script setup>
import {DataSource} from '~/dataSource/dataSource'
import {getIdFromUID, getUIDFromId, SwiftLoanStatuses, SwiftLoanUserRole} from '~/common/swift-loan'
import {toastSuccess} from '../utils/toast'
import {inputRules} from '~/common/input-rules'
import {user} from '~/utils/auth-data'

const dialog = ref(false)
const formData = ref([])
const clientFormData = ref([])
const form = ref()

defineExpose({
  openDialog,
})
async function openDialog(id) {
  dialog.value = true
  formData.value = new DataSource('request_credits', id)
  await formData.value.init()
  clientFormData.value = new DataSource('customers', formData.value.fields.customer.value)
  await clientFormData.value.init()
}
async function save() {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Заполните все поля')
    return
  }
  await formData.value.save()
}

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
const allowSave = computed(() => {
  return (
    ([
      getIdFromUID(SwiftLoanStatuses.CREATED_UID),
      getIdFromUID(SwiftLoanStatuses.POSTPONED_UID),
      getIdFromUID(SwiftLoanStatuses.TO_UNDERWRITER_UID),
    ].includes(formData.value.fields.status.value) ||
      !formData.value.fields.status.value) &&
    [SwiftLoanUserRole.callOfficer, SwiftLoanUserRole.customerServiceSpecialist].includes(user.value.swift_loan_role)
  )
})
const allowSendUnderwriter = computed(() => {
  return [getIdFromUID(SwiftLoanStatuses.CREATED_UID), getIdFromUID(SwiftLoanStatuses.POSTPONED_UID)].includes(
    formData.value.fields.status.value,
  )
})
async function sendToUnderwriter() {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Заполните все поля')
    return
  }
  formData.value.fields.status.value = getIdFromUID(SwiftLoanStatuses.TO_UNDERWRITER_UID)
  await formData.value.save()
  toastSuccess('Клиент отправлен Андеррайтеру')
}

async function print() {
  const config = useRuntimeConfig()
  const anchor = document.createElement('a')
  anchor.href = `${config.public.apiBase}/print-declaration/${formData.value.primaryKeyValue}/`
  anchor.target = '_blank'
  anchor.download = `declaration_${formData.value.primaryKeyValue}.pdf`
  anchor.click()
}
</script>
