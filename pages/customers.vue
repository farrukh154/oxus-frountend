<template>
    <div class="pa-4">
      <dynamic-data-table
        :tableTitle= "$t('customers.name')"
        modelName="customers"
        :can-export="true"
        :columns="[
          {name: 'name'},
          {name: 'birthday'},
          {name: 'gender'},
          {name: 'client_ID'},
          {name: 'INN'},
          {name: 'passport'},
          {name: 'passport_date'},
          {name: 'passport_details'},
          {name: 'branch'},
          {name: 'registration_address'},
          {name: 'registration_address_street'},
          {name: 'address'},
          {name: 'address_street'},
          {name: 'phone1'},
          {name: 'phone2'},
          {name: 'phone3'},
          {name: 'family_status'},
          {name: 'spouse'},
          {name: 'spouse_phone'},
        ]"
        :show-columns="['name', 'birthday', 'gender', 'client_ID', 'INN', 'passport']"
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
