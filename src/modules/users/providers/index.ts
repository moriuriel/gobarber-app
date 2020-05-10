import { container } from 'tsyringe';
import IHashProvider from './hashProvider/models/IHashProvider';
import BCryptHashProvider from './hashProvider/implementations/BCrptyHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
