<template>
  <div class="loader__container" v-if="loading">
    <div :class="['loader__body', clName || '']"></div>
    <p :class="['loader__message', clName || '']">
      {{ content || "Идёт загрузка данных" }}...
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  isLoading: boolean;
  content: string;
  clName: string;
}>();

const loading = ref<boolean>(props.isLoading);

watch(
  () => props.isLoading,
  (val) => (loading.value = val),
);
</script>

<style lang="scss">
.loader {
  font-family: $app-font__main;

  &__container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    @include flex-center;
    flex-direction: column;

    width: 100%;
    height: 100vh;

    background: $app__color_light;
  }

  &__body {
    width: 70px;
    height: 70px;

    border: 5px dotted $app__color_primary;
    border-radius: 100%;

    animation: run-loader 4s linear infinite;
  }

  &__message {
    font-size: $app-font__size_big;
    color: $app-primary;
  }
}

.body_dark .loader__container {
  background: $app__color_dark !important;
}

@keyframes run-loader {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
