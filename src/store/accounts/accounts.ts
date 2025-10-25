import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { IAccount } from "@/types/interfaces";
import { AppAccountTypeEnum, StorageKeysEnum } from "@/types/enums";
import { doStorageGet, doStorageSave } from "@/utils/hooks";

export const useAccountsStore = defineStore(StorageKeysEnum.ACCOUNTS, () => {
  const accounts = ref<IAccount[]>(
    doStorageGet(localStorage, StorageKeysEnum.ACCOUNTS, []),
  );

  const createAccount = () => {
    accounts.value.push({
      labels: [],
      type: AppAccountTypeEnum.LOCAL,
      login: "",
      password: "",
      hasSaved: false,
      id: new Date().getTime(),
    });
  };

  const updateAccount = (updated: IAccount) => {
    const idx = accounts.value.findIndex((acc) => acc.id === updated.id);
    idx !== -1 ? (accounts.value[idx] = updated) : accounts.value.push(updated);
  };

  const removeAccount = (id: number) => {
    accounts.value = accounts.value.filter((acc) => acc.id !== id);
  };

  watch(
    accounts,
    (newVal) => {
      const accForSave = newVal.filter((a) => a.hasSaved);
      doStorageSave(localStorage, StorageKeysEnum.ACCOUNTS, accForSave);
    },
    { deep: true },
  );

  return { accounts, createAccount, updateAccount, removeAccount };
});
