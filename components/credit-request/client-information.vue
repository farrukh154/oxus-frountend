<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card class="pa-8">
      <v-card-title> Информация о клиенте </v-card-title>
      <v-skeleton-loader :loading="loading" type="table">
        <v-card-text>
          <v-row>
            <v-col cols="2">1</v-col>
            <v-col cols="4">Филиал</v-col>
            <v-col cols="6">{{ data.branch_name }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">2</v-col>
            <v-col cols="4">ФИО</v-col>
            <v-col cols="6">{{ data.name }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">3</v-col>
            <v-col cols="4">ИНН</v-col>
            <v-col cols="6">{{ data.inn }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">4</v-col>
            <v-col cols="4">Серия и номер паспорта</v-col>
            <v-col cols="6">{{ data.passport }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">5</v-col>
            <v-col cols="4">ID</v-col>
            <v-col cols="6">{{ data.client_id }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">6</v-col>
            <v-col cols="4">Кредитный счет</v-col>
            <v-col cols="6">{{ data.credit_id }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">7</v-col>
            <v-col cols="4">Продукт</v-col>
            <v-col cols="6">{{ data.credit_product }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">8</v-col>
            <v-col cols="4">Сумма кредита</v-col>
            <v-col cols="6">{{ data.disbursed_tjs }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">9</v-col>
            <v-col cols="4">Срок кредита</v-col>
            <v-col cols="6">{{ data.installment }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">10</v-col>
            <v-col cols="4">Валюта</v-col>
            <v-col cols="6">{{ data.currency }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">11</v-col>
            <v-col cols="4">Процентная ставка</v-col>
            <v-col cols="6">{{ data.interest_rate / 100 / 12 }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">12</v-col>
            <v-col cols="4">Остаток кредита</v-col>
            <v-col cols="6">{{ data.olb_tjs }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">13</v-col>
            <v-col cols="4">Дата выдачи кредита</v-col>
            <v-col cols="6">{{ data.start_date }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">14</v-col>
            <v-col cols="4">Дата закрытия план</v-col>
            <v-col cols="6">{{ data.close_date }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">15</v-col>
            <v-col cols="4">Дата закрытия факт</v-col>
            <v-col cols="6">{{ data.close_date_fact }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">16</v-col>
            <v-col cols="4">Сумма взноза</v-col>
            <v-col cols="6">{{ data.total_repayment }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">17</v-col>
            <v-col cols="4">Кол-во раз в просрочке за последние 365 дней</v-col>
            <v-col cols="6">{{ data.late_days_count }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">18</v-col>
            <v-col cols="4">Кол-во дней в просрочке за последние 365 дней</v-col>
            <v-col cols="6">{{ data.late_days_sum || 0 }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">19</v-col>
            <v-col cols="4">Номер цикла</v-col>
            <v-col cols="6">{{ data.cycle }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">20</v-col>
            <v-col cols="4">Продолжительность кредитной истории в ОКСУС (месяцы)</v-col>
            <v-col cols="6">{{ data.duration_credit_history }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">21</v-col>
            <v-col cols="4">Выданная сумма последнего кредита (всех активных кредитов клиента)</v-col>
            <v-col cols="6">{{ data.disbursed_all }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">22</v-col>
            <v-col cols="4">Остаток текущего кредита клиента (всех активных кредитов клиента)</v-col>
            <v-col cols="6">{{ data.olb_all }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">23</v-col>
            <v-col cols="4">Активный кредит в просрочке</v-col>
            <v-col cols="6">{{ data.late_days }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">24</v-col>
            <v-col cols="4">Активный кредит реструктуризирован</v-col>
            <v-col cols="6">{{ data.rschd }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">25</v-col>
            <v-col cols="4">Активный кредит в портфеле юриста/коллектора</v-col>
            <v-col cols="6">{{ data.in_collector }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">26</v-col>
            <v-col cols="4">Клиент поручитель списанного кредита в Оксусе</v-col>
            <v-col cols="6">{{ data.written_off_guarantor }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">27</v-col>
            <v-col cols="4">Клиент поручитель другого активного кредита в Оксусе</v-col>
            <v-col cols="6">{{ data.guarantor_active_credit }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">28</v-col>
            <v-col cols="4">Клиент находится в процессе судопроизводства </v-col>
            <v-col cols="6">{{ data.court_case }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="2">29</v-col>
            <v-col cols="4">Клиент имеет активный экспресс кредит в Оксусе </v-col>
            <v-col cols="6">{{ data.have_active_express }}</v-col>
          </v-row>
        </v-card-text>
      </v-skeleton-loader>
    </v-card>
  </v-dialog>
</template>

<script setup>
import ApiFactory from '../factories/api-factory'
import {toastWarning} from '../utils/toast'

const apiClient = ApiFactory.build()
const dialog = shallowRef(false)
const data = ref({})
const loading = ref(false)

defineExpose({
  openDialog,
})

async function openDialog(abacusClientId) {
  loading.value = true
  const res = await apiClient.post('/request_credit/search_client_extra', {
    client_ID: abacusClientId,
  })
  if (res.length) {
    dialog.value = true
    data.value = res[0]
    loading.value = false
  } else {
    toastWarning('Клиент не имеет историю')
  }
}
</script>
