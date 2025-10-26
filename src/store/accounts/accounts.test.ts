import { setActivePinia, createPinia } from "pinia";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";
import { useAccountsStore } from "@/store/accounts/accounts";
import { AppAccountTypeEnum, StorageKeysEnum } from "@/types/enums";
import type { IAccount } from "@/types/interfaces";
import * as notifications from "@/utils/notifications";
import * as hooks from "@/utils/hooks";

describe("Accounts Store", () => {
  let store: ReturnType<typeof useAccountsStore>;
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    localStorageMock = {};
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key) => localStorageMock[key] || null),
      setItem: vi.fn((key, value) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key) => {
        delete localStorageMock[key];
      }),
      clear: vi.fn(() => (localStorageMock = {})),
    });

    vi.spyOn(notifications, "showNotification").mockImplementation(() => {});
    vi.spyOn(hooks, "doStorageSave").mockImplementation(() => {});

    setActivePinia(createPinia());
    store = useAccountsStore();
  });

  it("создает новый аккаунт и вызывает showNotification", () => {
    store.createAccount();
    const acc: IAccount = store.accounts[0]!;

    expect(store.accounts.length).toBe(1);
    expect(acc.type).toBe(AppAccountTypeEnum.LOCAL);
    expect(acc.login).toBe("");
    expect(acc.password).toBe("");
    expect(acc.hasSaved).toBe(false);
    expect(acc.id).toBeDefined();
    expect(notifications.showNotification).toHaveBeenCalledWith(
      notifications.CreateToastClName,
    );
  });

  it("обновляет существующий аккаунт и вызывает showNotification", async () => {
    store.createAccount();
    const acc: IAccount = store.accounts[0]!;
    const updated: IAccount = { ...acc, login: "testLogin", hasSaved: true };

    store.updateAccount(updated);
    await nextTick();

    expect(store.accounts[0]?.login).toBe("testLogin");
    expect(store.accounts[0]?.hasSaved).toBe(true);
    expect(notifications.showNotification).toHaveBeenCalledWith(
      notifications.SaveToastClNAme,
    );
    expect(hooks.doStorageSave).toHaveBeenCalled();
  });

  it("удаляет аккаунт и вызывает showNotification", async () => {
    store.createAccount();
    const acc: IAccount = store.accounts[0]!;

    store.removeAccount(acc.id);
    await nextTick();

    expect(store.accounts.length).toBe(0);
    expect(notifications.showNotification).toHaveBeenCalledWith(
      notifications.DeleteToastClNAme,
    );
    expect(hooks.doStorageSave).toHaveBeenCalled();
  });

  it("сохраняет только hasSaved аккаунты", async () => {
    store.createAccount();
    const acc: IAccount = store.accounts[0]!;
    const updated: IAccount = { ...acc, login: "login", hasSaved: true };

    store.updateAccount(updated);
    await nextTick();

    expect(hooks.doStorageSave).toHaveBeenCalledWith(
      localStorage,
      StorageKeysEnum.ACCOUNTS,
      [updated],
    );

    const updatedFalse: IAccount = { ...updated, hasSaved: false };
    store.updateAccount(updatedFalse);
    await nextTick();

    expect(hooks.doStorageSave).toHaveBeenCalledWith(
      localStorage,
      StorageKeysEnum.ACCOUNTS,
      [],
    );
  });
});
