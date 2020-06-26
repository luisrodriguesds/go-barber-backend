import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRoute = Router();

sessionRoute.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();
    const { user } = await authenticateUser.execute({
      email,
      password,
    });
    delete user.password;
    return response.json({ user });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionRoute;
