import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabiliryService from '@modules/appointments/services/ListProviderMonthAvailabiliryService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;
    const listProviderMonthAvailabiliry = container.resolve(
      ListProviderMonthAvailabiliryService,
    );
    const providers = await listProviderMonthAvailabiliry.execute({
      provider_id,
      month,
      year,
    });

    return response.json(providers);
  }
}

export default ProviderMonthAvailabilityController;
