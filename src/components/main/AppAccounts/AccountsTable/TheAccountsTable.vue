<template>
  <div
    :id="new Date().getTime() + '_table'"
    :class="['accounts-table app-table', props.tableClName || '']"
  >
    <div
      :class="[
        'app-table__header app-table__header_primary app-table_grid-resolutions',
      ]"
    >
      <div
        :key="idx + header"
        class="app-table__header-item"
        v-for="(header, idx) in props.headers"
      >
        {{ header }}
      </div>
    </div>
    <div
      :class="[
        'app-table__body',
        { 'app-table__body_empty': !store?.accounts?.length },
      ]"
    >
      <TheAccountsLine
        :key="acc.id"
        :account="acc"
        v-for="acc in store.accounts"
      />
      <AppEmptyBlock
        empty-message="Учётные записи отсутствуют"
        cl-name="app-table__body_empty-message"
        text-cl-name=""
        v-if="!store?.accounts.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheAccountsLine from "./AccountsLine/TheAccountsLine.vue";
import AppEmptyBlock from "@/components/ui/EmptyBlock/AppEmptyBlock.vue";

import { useAccountsStore } from "@/store/accounts/accounts";
import type { AppHeadersType } from "@/types/types";

const props = defineProps<{
  tableClName: string;
  headers: AppHeadersType;
  windowResolutionClasses: Array<string>;
}>();

const store = useAccountsStore();
</script>

<style lang="scss" src="./TheAccountsTable.scss"></style>
