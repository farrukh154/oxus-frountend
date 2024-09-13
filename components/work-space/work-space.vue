<template>
  <slot name="rootContext" />
  <template v-for="ctx of contexts" :key="ctx.uuid">
    <v-dialog v-model="ctx.dialog" persistent fullscreen>
      <global-card
        v-if="ctx.name === 'EditCard'"
        :apiModel="ctx.apiModel"
        :primary-key-value="ctx.primaryKeyValue"
        :context="ctx"
      />
      <dynamic-data-table-choose v-else-if="ctx.name === 'SmartTable'" :apiModel="ctx.apiModel" :context="ctx" />
    </v-dialog>
  </template>
</template>

<script setup>
import {contexts} from '~/workspace/workspace'

import GlobalCard from '../components/framework/forms/global-edit-card.vue'
import dynamicDataTableChoose from './dynamic-data-table-choose.vue';
</script>
