import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { month, day, year } = request.body;

    const ListProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await ListProviderDayAvailability.execute({
      provider_id: id,
      day,
      year,
      month,
    });

    return response.json(availability);
  }
}
export default ProviderDayAvailabilityController;
