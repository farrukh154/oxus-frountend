<template>
      <div class="pa-4">
        <dynamic-data-table
          :tableTitle= "$t('requestCreditList.name')"
          modelName="request_credits"
          :can-export="true"
          :columns="[
            {name: 'status.uid'},
            {name: 'status_change_date'},
            {name: 'branch.description'},
            {name: 'customer.name'},
            {name: 'customer.INN'},
            {name: 'customer.passport'},
            {name: 'customer.gender'},
            {name: 'created'},
            {name: 'created_by.get_full_name', label: 'Создано пользователем'},
          ]"
          :show-columns="['status.uid', 'status_change_date', 'branch.description', 'customer.name', 'created', 'created_by.get_full_name', 'customer.INN', 'customer.passport', 'customer.gender' ]"
          :can-create="false"
          :can-update="true"
          :can-delete="true"
          :selectable="true"
        />
      </div>
  </template>
  
  <script setup>
  import DynamicDataTable from '~/components/dynamic_table/dynamic-data-table.vue'
  
  </script>
  