import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import StorageDiskProvider from './StorageProvider/implementations/StorageDiskProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  StorageDiskProvider,
);
