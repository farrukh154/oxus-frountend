<template>
  <abacus-client-info
    :contract-actions="[{title: 'Поиск (история)', icon: mdiAccountSearchOutline, action: openCreditDialog}]"
  />
  <dialog-crif ref="dialogCrifRef" />
</template>

<script setup>
import dialogCrif from '~/components/crif/dialog-crif.vue'
import AbacusClientInfo from '~/components/abacus/abacus-client-info.vue'
import {mdiAccountSearchOutline} from '@mdi/js'
import ApiFactory from '~/factories/api-factory'

const dialogCrifRef = ref()
const apiClient = ApiFactory.build()

function openCreditDialog(info) {
  dialogCrifRef.value.openDialog(
    {
      abacusCustomerId: info.customerid,
      abacusCuAccountId: info.cuaccountid,
      abacusAccountNumber: info.accountnumber,
      swiftId: info.swiftId,
      name: info.name,
    },
    `&filter{abacus_credit_id}=${info.cuaccountid}`,
    checkCrif,
  )
}

async function checkCrif(info) {
  await apiClient.post('/crif-abacus-check/', info)
}
</script>
