import { NotificationType } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/types";

type Notificator = {
  notify(type: NotificationType, title: string, text: string): void;
} 

export default (): Notificator => {
  const notify = (type: NotificationType, title: string, text: string): void => {
    store.commit(NOTIFY, {
      title,
      text,
      type,
    });
  }
  return {
    notify,
  }
}