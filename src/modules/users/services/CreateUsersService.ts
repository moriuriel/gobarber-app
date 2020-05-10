import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/Errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface RequestUser {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, name, password }: RequestUser): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already user.');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUsersService;
