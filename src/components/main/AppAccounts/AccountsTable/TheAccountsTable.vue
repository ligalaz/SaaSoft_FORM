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
        { 'app-table__body_empty': !props.accounts || !props.accounts.length },
      ]"
    >
      <TheAccountsLine
        :accounts="props.accounts"
        v-if="props.accounts && props.accounts.length"
      />
      <AppEmptyBlock
        empty-message="Учётные записи отсутствуют"
        cl-name="app-table__body_empty-message"
        text-cl-name=""
        v-else
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheAccountsLine from "./AccountsLine/TheAccountsLine.vue";
import AppEmptyBlock from "@/components/ui/EmptyBlock/AppEmptyBlock.vue";
import type { IAccount } from "@/types/interfaces";
import type { AppHeadersType } from "@/types/types";

const props = defineProps<{
  tableClName: string;
  headers: AppHeadersType;
  accounts: Array<IAccount>;
  windowResolutionClasses: Array<string>;
}>();
</script>

<style lang="scss" src="./TheAccountsTable.scss"></style>
