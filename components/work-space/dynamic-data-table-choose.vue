<template>
    <v-card>
      <v-toolbar class="sticky-toolbar" elevation="3">
      <breadcrumbs :context="context"/>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn :icon="mdiClose" @click="context.closeContext()" v-tooltip:bottom="'Закрыть'" />
      </v-toolbar-items>
    </v-toolbar>
    <div class="ma-3">
        <dynamic-data-table :context="context" :model-name="apiModel" :columns="columns" :show-columns="showColumns" :table-title="context.verboseName" />
    </div>
    </v-card>

  </template>
  
  <script setup>
import {mdiClose} from '@mdi/js'
import DynamicDataTable from '~/components/dynamic_table/dynamic-data-table.vue'
import { settings } from '~/common/settings'
import breadcrumbs from '~/components/breadcrumbs.vue'

  const props = defineProps({
    apiModel: String,
    context: {
      type: Object,
      required: true,
    },
  })

  const modelSettings = settings().get(props.apiModel)
  const columns = modelSettings?.columns || []
  const showColumns = modelSettings?.showColumns || []

  </script>

<style scoped>
.sticky-toolbar {
  position: sticky;
  top: 0px;
  z-index: 1000;
}
</style>