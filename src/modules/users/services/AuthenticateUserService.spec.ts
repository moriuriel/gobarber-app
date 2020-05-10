import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUsersService from './CreateUsersService';
import AppError from '@shared/Errors/AppError';

describe('AuthenticateUser', () => {
  it('should be albe to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createUsers = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUsers.execute({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    const reponse = await authenticateUser.execute({
      email: 'john@email.com.br',
      password: '123',
    });

    expect(reponse).toHaveProperty('token');
  });

  it('should not be albe to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'john@email.com.br',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be albe to authenticate with worng password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createUsers = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUsers.execute({
      name: 'Jhon Doe',
      email: 'john@email.com.br',
      password: '123',
    });

    expect(
      authenticateUser.execute({
        email: 'john@email.com.br',
        password: '123345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
