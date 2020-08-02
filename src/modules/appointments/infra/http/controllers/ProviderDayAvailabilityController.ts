import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabiliry from '@modules/appointments/services/ListProviderDayAvailabiliry';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;
    const listProviderDayAvailabiliry = container.resolve(
      ListProviderDayAvailabiliry,
    );
    const providers = await listProviderDayAvailabiliry.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(providers);
  }
}

export default ProviderDayAvailabilityController;
