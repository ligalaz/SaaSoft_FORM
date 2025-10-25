<template>
  <div :class="['app-empty', props.clName || '']">
    <p :class="['app-empty__text', props.textClName || '']">
      {{ props.emptyMessage }}
    </p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  emptyMessage: string;
  clName: string;
  textClName: string;
}>();
</script>

<style lang="scss">
.app-empty {
  @include flex-center;

  &__text {
    font-size: $app__font_size-big;
    line-height: $app__font_size-big;
    font-weight: bold;
  }
}
</style>
