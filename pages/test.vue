<template>
  <dynamic-data-table
    tableTitle="request_credits"
    modelName="request_credits"
    :can-export="true"
    :columns="[
      {name: 'customer.name'},
      {name: 'customer.gender', label: 'Гендер'},
      {name: 'branch.name'},
      {name: 'customer.address.town.region.name'},
    ]"
    :show-columns="['name', 'gender', 'branch.name', 'customer.address.town.region.name']"
    :can-create="true"
    :can-update="true"
    :can-delete="true"
    :selectable="true"
  />
</template>

<script setup lang="ts">
import DynamicDataTable from '~/components/dynamic_table/dynamic-data-table.vue'
</script>

<!-- <dynamic-data-table
tableTitle="Branches"
modelName="branches"
:can-export="true"
:columns="[
  {name: 'id', label: 'Идентификатор'},
  {name: 'name', label: 'Имя'},
  {name: 'description', label: 'Описание'},
  {name: 'regional_branch', label: ''},
  {name: 'abacus_id', label: ''},
  {name: 'active', label: 'Актив'},
  {name: 'code', label: 'Код'},
]"
:show-columns="['regional_branch', 'description', 'id', 'abacus_id', 'code']"
external-filter="filter{regional_branch.in}=Kulob&filter{regional_branch.in}=Dushanbe"
/> -->
