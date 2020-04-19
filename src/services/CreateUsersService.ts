import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../Errors/AppError';
interface RequestUser {
  name: string;
  email: string;
  password: string;
}
class CreateUsersService {
  public async execute({ email, name, password }: RequestUser): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ email });

    if (checkUserExists) {
      throw new AppError('Email address already user.');
    }
    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUsersService;
