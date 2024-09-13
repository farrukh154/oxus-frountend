<template>

  <v-tabs  v-model="tab" background-color="primary">
    <v-tab v-if="can('users', 'view-abacus-document-tab-item')" value="documnet_abacus">Документы Абакуса</v-tab>
  </v-tabs>


  <v-window v-model="tab">
    <v-window-item v-if="can('users', 'view-abacus-document-tab-item')" value="documnet_abacus">
      <abacus-scan-client ref="abacusScanClientRef" />
      <abacus-scan-credit ref="abacusScanCreditRef" />
      <abacus-client-info
        :contract-actions="[{title: 'Документы', icon: mdiFileDocument, action: openCreditDialog}]"
        :client-actions="[{title: 'Документы', icon: mdiFileDocument, action: openClientDialog}]"
      />
    </v-window-item>
  </v-window>



  
</template>

<script setup>
import AbacusClientInfo from '~/components/abacus/abacus-client-info.vue'
import AbacusScanClient from '~/components/scans/abacus/client.vue'
import AbacusScanCredit from '~/components/scans/abacus/credit.vue'
import {mdiFileDocument} from '@mdi/js'
import {can} from '~/common/ability'
const abacusScanClientRef = ref()
const abacusScanCreditRef = ref()
const tab = ref(null)
function openCreditDialog(info) {
  abacusScanCreditRef.value.openDialog(info.customerid, info.accountnumber, info.name, info.cuaccountid)
}

function openClientDialog(info) {
  abacusScanClientRef.value.openDialog(info.customerid, info.name)
}
</script>
