import { getMongoRepository, MongoRepository } from 'typeorm';

import Notifications from '../schemas/Notification';
import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';
import INotificationsRepository from '../../../repositories/INotificationsRepository';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notifications>;

  constructor() {
    this.ormRepository = getMongoRepository(Notifications, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notifications> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
