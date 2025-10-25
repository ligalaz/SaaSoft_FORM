<template>
  <div class="app-page app__form-page app__container">
    <TheAccountsControls />
    <TheAccountsTable
      table-cl-name=""
      :headers="headers"
      :accounts="accounts"
      :window-resolution-classes="[]"
    />
  </div>
</template>

<script setup lang="ts">
import { AppAccountTypeEnum } from "@/types/enums";
import TheAccountsControls from "../main/AppAccounts/AccountsControls/TheAccountsControls.vue";
import TheAccountsTable from "../main/AppAccounts/AccountsTable/TheAccountsTable.vue";

const headers = ["Метки", "Тип записи", "Логин", "Пароль", ""];
const accounts = [
  {
    labels: [{ text: "1" }, { text: "45454gsd" }],
    type: AppAccountTypeEnum.LOCAL,
    login: "olololo",
    password: "22222232323",
    hasSaved: true,
    id: 1,
  },
  {
    labels: [{ text: "null" }, { text: "22" }],
    type: AppAccountTypeEnum.LDAP,
    login: "ffff",
    password: null,
    hasSaved: true,
    id: 3,
  },
  {
    labels: [{ text: "ghghg" }, { text: "ghghg" }],
    type: AppAccountTypeEnum.LOCAL,
    login: "34dgfgfd",
    password: "sf3efsfd",
    hasSaved: false,
    id: 5,
  },
];
</script>

<style lang="scss"></style>
