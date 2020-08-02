import { container } from 'tsyringe';
import '@modules/users/providers';
import '@shared/providers';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointimentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationRepository',
  NotificationRepository,
);
