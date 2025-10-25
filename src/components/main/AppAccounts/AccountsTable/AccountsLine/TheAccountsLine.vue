<template>
  <div
    :class="[
      'accounts-line app__accounts-lines app-table__line',
      acc.password != null
        ? 'app-table_grid-resolutions'
        : 'app-table_grid-resolutions-slice',
      { 'app-table__line_selected': !acc.hasSaved },
    ]"
    v-for="(acc, idx) in props.accounts"
  >
    <div class="app-table__line-item app__accounts_label">
      <AppField :is-error="false">
        <input
          type="text"
          :placeholder="Consts.defaultPlaceholder"
          :value="acc.labels.map((it) => it.text).join('; ')"
        />
      </AppField>
    </div>
    <div class="app-table__line-item app__accounts_type">
      <AppField :is-error="false">
        <select name="account_type" :id="'accounts_sel_' + idx">
          <option>1</option>
          <option>2</option>
        </select>
      </AppField>
    </div>
    <div class="app-table__line-item app__accounts_login">
      <AppField :is-error="false"
        ><input
          :placeholder="Consts.defaultPlaceholder"
          type="text"
          :value="acc.login"
      /></AppField>
    </div>
    <div
      class="app-table__line-item app__accounts_password"
      v-if="acc.password != null"
    >
      <AppField :is-error="false">
        <input type="password" :value="acc.password" />
        <span class="material-icons">visibility_off</span></AppField
      >
    </div>
    <div class="app-table__line-item app__accounts_remove">
      <p class="material-icons">highlight_off</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppField from "@/components/ui/Field/AppField.vue";
import type { IAccount } from "@/types/interfaces";
import Consts from "@/utils/const";

const props = defineProps<{
  accounts: Array<IAccount>;
}>();
</script>

<style lang="scss" src="./TheAccountsLine.scss"></style>
