export enum NotificationType {
  SUCCESS,
  ERROR,
  WARNING,
}

export default interface INotification {
  id: number;
  title: string;
  text: string;
  type: NotificationType;
}