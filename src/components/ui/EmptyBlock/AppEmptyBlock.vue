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
    font-size: 1.25rem;
    line-height: 1.4rem;
    font-weight: bold;
  }
}
</style>
