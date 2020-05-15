import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/Errors/AppError';

let fakeUserRespository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRespository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRespository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRespository.create({
      name: 'Joe Doe',
      email: 'joedoe@email.com.br',
      password: '123',
    });

    await sendForgotPasswordEmail.execute({ email: 'joedoe@email.com.br' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'joedoe@email.com.br' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateTOken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRespository.create({
      name: 'Joe Doe',
      email: 'joedoe@email.com.br',
      password: '123',
    });

    await sendForgotPasswordEmail.execute({ email: 'joedoe@email.com.br' });

    expect(generateTOken).toHaveBeenCalledWith(user.id);
  });
});
