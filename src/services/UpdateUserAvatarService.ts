import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../Errors/AppError';

interface AvatarRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFileName,
  }: AvatarRequest): Promise<User> {
    const userRepositroy = getRepository(User);

    const user = await userRepositroy.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFilePath) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepositroy.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
