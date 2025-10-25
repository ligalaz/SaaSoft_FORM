<template>
  <div class="app-layout">
    <AppHeader />
    <FormPage />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "./components/main/AppHeader/AppHeader.vue";
import FormPage from "./components/pages/FormPage.vue";
import AppFooter from "./components/main/AppFooter/AppFooter.vue";
</script>

<style scoped></style>
