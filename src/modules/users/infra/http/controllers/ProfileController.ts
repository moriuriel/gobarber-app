import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute(userId);

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, oldPassword } = request.body;
    const userId = request.user.id;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      name,
      email,
      password,
      user_id: userId,
      oldPassword,
    });

    delete user.password;
    return response.json(user);
  }
}
export default ProfileController;
