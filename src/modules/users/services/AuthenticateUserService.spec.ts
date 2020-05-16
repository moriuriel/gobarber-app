import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUsersService from './CreateUsersService';
import AppError from '@shared/Errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUsers: CreateUsersService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    createUsers = new CreateUsersService(fakeUserRepository, fakeHashProvider);
  });
  it('should be albe to authenticate', async () => {
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
    expect(
      authenticateUser.execute({
        email: 'john@email.com.br',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be albe to authenticate with worng password', async () => {
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
