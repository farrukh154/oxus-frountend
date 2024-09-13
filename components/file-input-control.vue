<template>
  <a v-show="false" ref="fileDownload" :href="value" :download="getFullFileName" target="_blank" />
  <v-file-input
    :label="field.label"
    hint="Выберите файл"
    :loading="loading"
    :accept="field.acceptFileFormat"
    v-model="value"
    :rules="field.rules"
  >
    <template #append>
      <v-btn
        v-if="getFileName && modelValue.startsWith('http')"
        icon
        small
        title="Скачать файл"
        class="unlocked"
        @click="$refs.fileDownload.click()"
      >
        <v-icon>{{ mdiFileDownload }}</v-icon>
      </v-btn>
      <v-progress-circular v-if="loading" indeterminate color="success" size="24"></v-progress-circular>
    </template>
  </v-file-input>
</template>

<script setup>
import {UPLOAD_URL} from '~/common/constants'
import {mdiFileDownload} from '@mdi/js'
import ApiFactory from '~/factories/api-factory'
const apiClient = ApiFactory.build()

const props = defineProps({
  modelValue: {},
  field: {
    type: Object,
    default: {},
  },
})
const loading = ref(false)

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    if (!props.modelValue) {
      return null
    }
    return getFileName.value ? new File([''], getFileName.value, {type: 'text/plain'}) : undefined
  },
  async set(v) {
    if (!v) {
      emit('update:modelValue', null)
      return
    }
    loading.value = true
    try {
      const formData = new FormData()
      formData.append('files', v, v.name)
      const filePath = await apiClient.post(UPLOAD_URL, formData)
      emit('update:modelValue', JSON.parse(filePath).file_paths[0])
    } finally {
      loading.value = false
    }
  },
})

const getFileName = computed(() => {
  if (!props.modelValue) {
    return undefined
  }
  const fileName = decodeURIComponent(props.modelValue.split('/').pop())
  return fileName.length > 14 ? `${fileName.slice(0, 14)}...` : fileName
})

const getFullFileName = computed(() =>
  props.modelValue ? decodeURIComponent(props.modelValue.split('/').pop()) : undefined,
)
</script>
