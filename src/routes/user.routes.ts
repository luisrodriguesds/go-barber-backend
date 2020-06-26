import { Router } from 'express';
import CreateUserService from '../services/CreateUserServer';

const userRoute = Router();

userRoute.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default userRoute;
