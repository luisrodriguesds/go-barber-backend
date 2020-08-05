import { Request, Response } from 'express';
// import { parseISO } from 'date-fns';

import { container } from 'tsyringe';
import CreateAppointimentService from '@modules/appointments/services/CreateAppointimentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;
    // const parseDate = parseISO(date); -> o Joi já tá convertendo

    const createAppointment = container.resolve(CreateAppointimentService);
    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date,
    });
    return response.json(appointment);
  }
}

export default AppointmentsController;
