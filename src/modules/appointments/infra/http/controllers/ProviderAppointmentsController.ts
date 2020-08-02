import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppoinmentsService from '@modules/appointments/services/ListProviderAppoinmentsService';

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listProviderAppoinments = container.resolve(
      ListProviderAppoinmentsService,
    );
    const appointments = await listProviderAppoinments.execute({
      provider_id,
      month,
      day,
      year,
    });

    return response.json(appointments);
  }
}

export default ProviderAppointmentsController;
