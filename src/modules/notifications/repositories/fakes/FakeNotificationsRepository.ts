import INotificationsRepository from '../INotificationsRepository';
import ICreateNotificationDto from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import { ObjectID } from 'mongodb';

class FakeNotificationRepository implements INotificationsRepository {
  private listNotifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDto): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.listNotifications.push(notification);

    return notification;
  }
}

export default FakeNotificationRepository;
