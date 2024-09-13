<template>
  <v-autocomplete
    v-model="value"
    :items="itemsFiltered"
    :item-title="itemTitle"
    item-value="id"
    @update:search="search"
  />
</template>

<script setup>
import ApiFactory from '~/factories/api-factory'
import {getModelLink} from '~/common/domain-model'

const props = defineProps({
  modelValue: {},
  apiModel: {
    type: String,
    required: true,
  },
  itemTitle: {
    type: String,
    default: 'name',
  },
  loadAll: {
    type: Boolean,
    default: false,
  },
  parentFilterName: {
    type: String,
    default: '',
  },
  parentFilterId: {
    type: [Number, Boolean],
    default: 0,
  },
})

const items = ref([])
const emit = defineEmits(['update:modelValue'])
const url = ref('')
const resourceNames = ref('')
const apiClient = ApiFactory.build()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

onMounted(async () => {
  const [link, prop] = await getModelLink(props.apiModel)
  url.value = link
  resourceNames.value = prop.resource_name_plural
  loadValue()
})

async function loadValue() {
  if (props.loadAll) {
    const res = await apiClient.get(url.value)
    items.value = await res[resourceNames.value]
  } else if (props.modelValue) {
    const res = await apiClient.get(`${url.value}?filter{id}=${value.value}`)
    items.value = await res[resourceNames.value]
  }
}

async function search(value) {
  if (value && !props.loadAll) {
    const res = await apiClient.get(`${url.value}?filter{${props.itemTitle}.icontains}=${value}`)
    items.value = await res[resourceNames.value]
  }
}

const itemsFiltered = computed(() => {
  if (!props.parentFilterName) {
    return items.value
  }
  return items.value.filter((i) => i[props.parentFilterName] === props.parentFilterId)
})

watch(
  () => value.value,
  (curr, prev) => {
    if (!props.loadAll) {
      loadValue()
    }
  },
)
</script>
