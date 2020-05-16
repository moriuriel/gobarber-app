import AppError from '@shared/Errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUsers: CreateUsersService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUsers = new CreateUsersService(fakeUserRepository, fakeHashProvider);
  });
  it('should be albe to create a new user', async () => {
    const user = await createUsers.execute({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be albe to create a new user with same email from another', async () => {
    await createUsers.execute({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    expect(
      createUsers.execute({
        name: 'Jhon Doe',
        email: 'john@email.com.br',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
