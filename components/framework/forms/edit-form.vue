<template>
  <v-card>
    <v-toolbar class="sticky-toolbar" elevation="3">
      <breadcrumbs :context="context" />
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          color="warning"
          :icon="mdiRestore"
          :disabled="!dataSource.fieldsChanged"
          @click="resetFields"
          v-tooltip:bottom="'Сброc'"
        />
        <v-btn
          v-if="!dataSource.primaryKeyValue && can(dataSource.apiModel, 'add')"
          color="success"
          :icon="mdiContentSave"
          :disabled="!dataSource.fieldsChanged"
          @click="edit(false)"
          v-tooltip:bottom="'Добавить'"
        />
        <v-btn
          v-if="!dataSource.primaryKeyValue && can(dataSource.apiModel, 'add')"
          color="success"
          :icon="mdiContentSaveMove"
          :disabled="!dataSource.fieldsChanged"
          @click="edit(true)"
          v-tooltip:bottom="'Добавить и закрыть'"
        />
        <v-btn
          v-if="dataSource.primaryKeyValue && can(dataSource.apiModel, 'change')"
          color="primary"
          :icon="mdiContentSave"
          :disabled="!dataSource.fieldsChanged"
          @click="edit(false)"
          v-tooltip:bottom="'Сохранить'"
        />
        <v-btn
          v-if="dataSource.primaryKeyValue && can(dataSource.apiModel, 'change')"
          color="primary"
          :icon="mdiContentSaveMove"
          :disabled="!dataSource.fieldsChanged"
          @click="edit(true)"
          v-tooltip:bottom="'Сохранить и закрыть'"
        />

        <v-btn :icon="mdiClose" @click="closeAsk" v-tooltip:bottom="'Закрыть'" />
      </v-toolbar-items>
    </v-toolbar>
    <v-form ref="form" class="ma-2">
      <slot />
    </v-form>
  </v-card>
</template>

<script setup>
import {mdiClose, mdiContentSaveMove, mdiContentSave, mdiRestore} from '@mdi/js'
import {can} from '~/common/ability'
import {confirmDialog} from '~/utils/confirm-dialog'
import breadcrumbs from '~/components/breadcrumbs.vue'
const form = ref()

const props = defineProps({
  dataSource: {
    type: Object,
    required: true,
  },
  context: {
    type: Object,
    required: true,
  },
})

const resetFields = () => {
  props.dataSource.resetFieldsValues()
}

async function edit(action) {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Заполните все поля')
    return
  }
  await props.dataSource.save()
  if (action) {
    close()
  }
}

function close() {
  props.context.closeContext()
}

function closeAsk() {
  if (props.dataSource.fieldsChanged) {
    confirmDialog({
      title: 'Подтверждения',
      body: 'Вы действительно хотите отменить изменения?',
      cancelButtonText: 'Нет',
      confirmButtonText: 'Да',
      onConfirm: close,
    })
  } else {
    close()
  }
}
</script>

<style scoped>
.sticky-toolbar {
  position: sticky;
  top: 0px;
  z-index: 1000;
}
</style>
