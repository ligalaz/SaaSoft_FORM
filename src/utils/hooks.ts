import { nextTick } from "vue";

// Базовая здаержка для пользовательских ивентов
export function doDebounced<F extends (...args: any[]) => void>(
  func: F,
  wait: number,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<F>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Динамически вычисляет высоты сопутствующих элементов на странице и вычисляет максимально возможную высоту таблицы
export function doResizeTable(
  resolutionClasses: Array<string>,
  margin: number,
) {
  const averageMargin = margin; // Учитывает возможные отступы между блоками, может колебаться
  const windowHeight = window.innerHeight; // высота окна
  const body = document.querySelector(".app-table__body") as HTMLDivElement; // тело таблицы - целевой элемент
  const tHeader = document.querySelector(
    ".app-table__header",
  ) as HTMLDivElement; // Header таблицы

  let sum = 0; // Сумма прочих переданных для расчета элементов

  // Общие элементы страниц
  let header = document.querySelector(".app__header");
  let footer = document.querySelector(".app__footer");

  const defaults = [
    ".app__header",
    "app__header",
    ".app__footer",
    "app__footer",
    ".app-table__header",
    "app-table__header",
  ];
  const anyResolutions = Array.from(new Set(resolutionClasses)).filter(
    (clName: string) => !defaults.includes(clName),
  );

  if (anyResolutions.length) {
    anyResolutions.forEach((clName: string) => {
      let cl = !clName.startsWith(".") ? "." + clName : clName;
      const elem = document.querySelector(cl) as HTMLDivElement;
      const styles = window?.getComputedStyle(elem);
      if (elem) sum += elem.clientHeight + parseFloat(styles?.marginTop || "0");
    });
  }

  let result =
    windowHeight -
    ((header ? header.clientHeight : 0) +
      (footer ? footer.clientHeight : 0) +
      +(tHeader ? tHeader.clientHeight : 0)) -
    sum -
    averageMargin;

  // Учитывает если таблица скроллится, то добавит отступ справа в голове таблицы
  body && tHeader && body?.scrollHeight > body.clientHeight
    ? (tHeader.style.paddingRight = `15px`)
    : (tHeader.style.paddingRight = `0`);

  if (body) body.style.maxHeight = `${result}px`; // Устанавливает максимальную допустимую высоту для тела таблицы
}

export function doStorageGet(storage: Storage, key: string, defValue: any) {
  const value = storage.getItem(key) || defValue;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
export function doStorageSave(storage: Storage, key: string, data: any) {
  const value = typeof data === "object" ? JSON.stringify(data) : data;
  storage.setItem(key, value);
}

export async function initMSelect() {
  await nextTick();
  const elems = document.querySelectorAll("select");
  M.FormSelect.init(elems);
}
