import M from "materialize-css";

export const ErrorToastClName = "red";
export const CreateToastClName = "light_blue";
export const SaveToastClNAme = "green";

export function showNotification(type: string, delay = 3000) {
  if (!type) return;

  let message = "Это высплывающее сообщение!";

  switch (type) {
    case ErrorToastClName:
      message = "Ошибка валидации создания учётной записи!";
      break;
    case CreateToastClName:
      message = "Учётная запись добавлена!";
      break;
    case SaveToastClNAme:
      message = "Учётная запись сохранена!";
      break;
    default:
      break;
  }

  M.Toast.dismissAll();
  M.toast({
    html: message,
    classes: type,
    displayLength: delay,
  });
}
