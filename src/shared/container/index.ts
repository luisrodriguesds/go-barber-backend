import { container } from 'tsyringe';
import '@modules/users/providers';
import '@shared/providers';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointimentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

// import IUsersTokenRepository from '@modules/users/repositories/IUserTokenRepository';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
