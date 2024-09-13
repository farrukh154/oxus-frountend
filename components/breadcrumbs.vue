<template>
  <nav class="breadcrumbs">
    <ul>
      <li v-for="(breadcrumb, index) in itemsContexs" :key="index" :class="{active: breadcrumb.active}">
        <a v-if="!breadcrumb.active" :href="breadcrumb.href">
          <span class="status_circle" :style="{backgroundColor: statusColor(breadcrumb.status)}"></span>
          <span :style="{color: isDarkMode ? 'white' : 'black'}">{{ breadcrumb.label }}</span>
        </a>
        <span v-else>
          <div class="isActive" :style="{color: isDarkMode ? 'white' : 'black'}">
            {{ breadcrumb.label }}
          </div>
        </span>
        <v-btn
          class="close"
          @click="closeAllContexts(breadcrumb.uuid)"
          :color="breadcrumb.active ? 'primary' : 'success'"
          size="28"
          :icon="mdiClose"
          elevation="5"
        />

        <v-icon v-if="index < itemsContexs.length - 1" class="chevron-icon" :icon="mdiChevronRight"></v-icon>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {mdiChevronRight, mdiClose} from '@mdi/js'
import {contexts, closeAllContexts} from '~/workspace/workspace'
import { useThemeSwitcher } from '../utils/theme';

const { isDarkMode } = useThemeSwitcher()

const props = defineProps({
  context: {
    type: Object,
    required: true,
  },
})

const itemsContexs = computed(() =>
  contexts.value.map((item) => ({
    uuid: item.uuid,
    label:  item.primaryKeyValue ? `${item.verboseName}: ${item.primaryKeyValue}` : `${item.verboseName}`,
    href: '#',
    status: item.name,
    active: item.uuid === props.context.uuid,
  })),
)

const statusColor = (stsColor) => {
  switch (stsColor) {
    case 'EditCard':
      return '#1976d2'
    case 'SmartTable':
      return '#4caf50'
    default:
      return 'orange'
  }
}

</script>

<style scoped>
.breadcrumbs ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 8px;
  font-size: 14px;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0px 0px 0px 8px;
  border: 2px solid #4caf50;
  border-radius: 50px;
  margin-right: 22px;
}

.breadcrumb-content {
  display: flex;
  align-items: center;
}

.breadcrumbs li:not(:last-child) .chevron-icon {
  position: absolute;
  right: -25px;
  top: 50%;
  color: gray;
  transform: translateY(-50%);
}

.breadcrumbs li a,
.breadcrumbs li span {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
}

.status_circle {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  margin-right: 5px;
}

.v-btn.close {
  margin-left: 10px;
}

.breadcrumbs li.active {
  border-color: #1976d2;
}
</style>
