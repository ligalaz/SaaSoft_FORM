<template>
  <div class="app-page app__form-page app__container">
    <TheAccountsControls />
    <TheAccountsTable
      table-cl-name=""
      :headers="headers"
      :window-resolution-classes="['.app__controls']"
    />
  </div>
</template>

<script setup lang="ts">
import TheAccountsControls from "../main/AppAccounts/AccountsControls/TheAccountsControls.vue";
import TheAccountsTable from "../main/AppAccounts/AccountsTable/TheAccountsTable.vue";

const headers = ["Метки", "Тип записи", "Логин", "Пароль", ""];
</script>

<style lang="scss"></style>
