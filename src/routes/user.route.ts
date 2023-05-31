import { Request, Response } from 'express';
import Routes from './Routes';
import UserController from '../controllers/user.controller';

class UserRoutes extends Routes {
  constructor() {
    super();
    this.initializeRoutes();
  }

  public initializeRoutes() {
    super.Post('/', UserController.CreateUser);

    super.Post('/sign-in', UserController.SignIn);

    super.Get('/', UserController.GetUser);
  }
}

export default new UserRoutes();
