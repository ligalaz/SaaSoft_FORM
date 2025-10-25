<template>
  <div :class="['app-field', { 'app-field_error': props.isError }]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isError: boolean;
}>();
</script>

<style lang="scss">
.app-field {
  width: 100%;
  height: 100%;
  @include flex-center;
  overflow: auto;

  border-radius: $app__radius_standard;

  border: $app__border_standard solid $app__color_field;

  &:not(.app-field_error):focus-within {
    border: $app__border_standard solid $app__color_primary;
  }

  &_error {
    border: $app__border_standard solid $app__color_error;
  }
}
</style>
