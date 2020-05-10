import AppError from '@shared/Errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be albe to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsers = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUsers.execute({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be albe to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsers = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );

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
