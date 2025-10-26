import { describe, it, expect, vi, beforeEach } from "vitest";

import {
  doDebounced,
  doResizeTable,
  doStorageGet,
  doStorageSave,
  initMSelect,
} from "@/utils/hooks";

describe("utils/hooks", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("doDebounced — вызывает функцию с задержкой", async () => {
    const fn = vi.fn();
    const debounced = doDebounced(fn, 50);

    debounced();
    debounced();
    expect(fn).not.toHaveBeenCalled();

    await new Promise((r) => setTimeout(r, 60));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("doStorageGet / doStorageSave — сохраняет и получает данные", () => {
    const key = "testKey";
    const data = { a: 1, b: 2 };

    doStorageSave(localStorage, key, data);
    const result = doStorageGet(localStorage, key, null);

    expect(result).toEqual(data);
  });

  it("doStorageGet — возвращает значение по умолчанию, если нет ключа", () => {
    const result = doStorageGet(localStorage, "nonexistent", 42);
    expect(result).toBe(42);
  });

  it("doResizeTable — корректно устанавливает maxHeight и paddingRight", () => {
    const body = document.createElement("div");
    body.className = "app-table__body";
    Object.defineProperty(body, "clientHeight", { value: 300 });
    Object.defineProperty(body, "scrollHeight", { value: 400 });

    const header = document.createElement("div");
    header.className = "app__header";
    Object.defineProperty(header, "clientHeight", { value: 50 });

    const footer = document.createElement("div");
    footer.className = "app__footer";
    Object.defineProperty(footer, "clientHeight", { value: 30 });

    const tHeader = document.createElement("div");
    tHeader.className = "app-table__header";
    Object.defineProperty(tHeader, "clientHeight", { value: 40 });

    document.body.append(body, header, footer, tHeader);
    Object.defineProperty(window, "innerHeight", { value: 800 });

    doResizeTable([], 20);

    expect(body.style.maxHeight).toMatch(/\d+px/);
    expect(tHeader.style.paddingRight).toBe("15px");
  });

  it("initMSelect — вызывает M.FormSelect.init для всех select", async () => {
    (globalThis as any).M = {
      FormSelect: { init: vi.fn() },
    };

    const select = document.createElement("select");
    document.body.appendChild(select);

    await initMSelect();

    expect(M.FormSelect.init).toHaveBeenCalled();

    const nodeList = (M.FormSelect.init as any).mock.calls[0][0];
    expect(Array.from(nodeList)).toContain(select);
  });
});
