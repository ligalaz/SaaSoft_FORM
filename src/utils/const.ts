const Consts = {
  maxLabelLength: 50,
  maxLoginLength: 100,
  maxPasswordLength: 100,
  defaultPlaceholder: "Значение",
} as const;

// Делаем поля объекта неизменяемыми
const keys = Object.keys(Consts);
keys.forEach((key) =>
  Object.defineProperty(Consts, `${key}`, {
    writable: false,
    configurable: false,
  }),
);

export default Consts;
