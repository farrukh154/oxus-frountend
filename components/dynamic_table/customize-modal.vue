<template>
  <v-dialog :model-value="dialog" @update:model-value="updateDialog" persistent max-width="700px">
    <v-card>
      <v-card-title>Настройка таблицы</v-card-title>
      <v-card-text>
        <draggable
          :list="headersRef"
          :disabled="!draggingEnabled"
          item-key="name"
          class="list-group"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
        >
          <template #item="{element}">
            <div
              v-if="element.type !== 'actions'" 
              class="list-group-item" 
              :class="{'not-draggable': !draggingEnabled}"
            >
              <v-row>
                <v-col cols="10">
                  <span>{{ element.title }}</span>
                </v-col>
                <v-col>
                  <v-switch
                    v-if="element.key !== 'id'"
                    v-model="element.visible"
                    density="compact"
                    color="success"
                    hide-details
                  />
                </v-col>
              </v-row>
            </div>
          </template>
        </draggable>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="resetTableCustomization">{{ $t('dynamictable.default') }} </v-btn>
        <v-btn color="success" @click="saveTableCustomization">{{ $t('dynamictable.save') }} </v-btn>
        <v-btn color="red" @click="closeModal">{{ $t('dynamictable.cancel') }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import TableConfigService from './table-config-service'
import {ref} from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({
  modelName: String,
  headersRef: Array,
  dialog: Boolean,
  columnFilters: Object,
})

const emit = defineEmits(['update:dialog', 'update:customized'])

const dragging = ref(false)
const draggingEnabled = ref(true)

const closeModal = () => {
  updateDialog(false)
}

const saveTableCustomization = () => {
  updateHeaderOrder()

  customized()
  updateDialog(false)
}
const resetTableCustomization = () => {
  TableConfigService.removeTableConfig(props.modelName)
  customized()
  updateDialog(false)
}
const updateHeaderOrder = () => {
  TableConfigService.saveTableConfig(props.modelName, {headers: props.headersRef})
}

const customized = () => {
  emit('update:customized')
}
const updateDialog = (value: any) => {
  emit('update:dialog', value)
}
</script>

<style scoped></style>
./table-config-service
