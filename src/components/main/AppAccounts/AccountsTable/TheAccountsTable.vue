<template>
  <div
    :id="new Date().getTime() + '_table'"
    :class="['accounts-table app-table', props.tableClName || '']"
  >
    <TheAccountsHeader :headers="headers" />
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
import TheAccountsHeader from "./AccountsHeader/TheAccountsHeader.vue";
import TheAccountsLine from "./AccountsLine/TheAccountsLine.vue";
import AppEmptyBlock from "@/components/ui/EmptyBlock/AppEmptyBlock.vue";

import { useAccountsStore } from "@/store/accounts/accounts";
import type { AppHeadersType } from "@/types/types";
import { doResizeTable } from "@/utils/hooks";
import { onMounted, onUpdated } from "vue";

const props = defineProps<{
  tableClName: string;
  headers: AppHeadersType;
  windowResolutionClasses: Array<string>;
}>();

const store = useAccountsStore();

onMounted(() => {
  doResizeTable(props.windowResolutionClasses || [], 50);
  window.addEventListener("resize", () =>
    doResizeTable(props.windowResolutionClasses || [], 50),
  );
});
onUpdated(() => doResizeTable(props.windowResolutionClasses || [], 50));
</script>

<style lang="scss" src="./TheAccountsTable.scss"></style>
