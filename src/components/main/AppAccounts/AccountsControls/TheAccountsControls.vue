<template>
  <div class="app__controls">
    <div class="app__controls_host app__controls_block">
      <h5 class="app__description app__controls_desc">Учётные записи</h5>
      <button @click="createAccount" class="app__btn app__controls_btn">
        +
      </button>
    </div>
    <div class="app__controls_label-info app__controls_block">
      <p class="app__controls_info">
        <span class="material-icons">help</span>
        <span
          >Для указания нескольких меток для одной пары логин/пароль используйте
          разделитель ";"</span
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from "@/store/accounts/accounts";
const { createAccount } = useAccountsStore();
</script>

<style lang="scss" src="./TheAccountsControls.scss"></style>
