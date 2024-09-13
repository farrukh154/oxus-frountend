<template>
  <div class="pa-4">
    <dynamic-data-table
      :tableTitle="$t('cardTabName.forms_call')"
      modelName="client_decisions"
      :can-export="true"
      :columns="[
        {name: 'customer.name'},
        {name: 'created_by.get_full_name'},
        {name: 'created'},
        {name: 'application_receipt_channel'},
        {name: 'client_decision'},
        {name: 'customer_response'},
        {name: 'employee_comments'},
        {name: 'client_refused'},
        {name: 'missed_call'},
        {name: 'active_in_abacus'},
      ]"
      :show-columns="[
        'customer.name',
        'created_by.get_full_name',
        'created',
        'application_receipt_channel',
        'client_decision',
        'customer_response',
        'employee_comments',
        'client_refused',
        'missed_call',
        'active_in_abacus',
      ]"
      :can-create="false"
      :can-update="true"
      :can-delete="false"
      :selectable="false"
    />
  </div>
</template>

<script setup>
import DynamicDataTable from '~/components/dynamic_table/dynamic-data-table.vue'
</script>
