import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import { ObjectID } from 'mongodb';
import Notification from '../../infra/typeorm/schemas/Notification';

class FakeNotificationRepository implements INotificationsRepository {
  private notification: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), recipient_id, content });

    this.notification.push(notification);
    return notification;
  }
}

export default FakeNotificationRepository;
