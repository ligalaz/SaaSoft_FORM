<template>
  <div
    :class="[
      'app-table__header app-table__header_primary app-table_grid-resolutions',
    ]"
  >
    <div
      :key="idx + header"
      class="app-table__header-item"
      v-for="(header, idx) in props.headers"
    >
      {{ header }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  headers: Array<string>;
}>();
</script>
