<template>
  <div class="app-layout">
    <AppHeader />
    <FormPage />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from "./components/main/AppFooter/AppFooter.vue";
import AppHeader from "./components/main/AppHeader/AppHeader.vue";
import FormPage from "./components/pages/FormPage.vue";
</script>

<style scoped></style>
