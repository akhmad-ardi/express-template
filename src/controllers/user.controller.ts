import 'dotenv/config';
import { Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// validation
import UserValidation from '../validation/user.validation';
import ValidationError from '../validation/ValidationError';

// models
import UserModel from '../models/User.model';

// logger
import { logger } from '../lib/Logger';
import ms from 'ms';

class UserController {
  public async CreateUser(req: Request, res: Response): Promise<Response> {
    try {
      // data request validadation
      const dataValidated = await UserValidation.CreateValidation(req.body);

      const userAlreadyExist = await UserModel.findOne({ username: dataValidated.username });
      if (userAlreadyExist) throw new ValidationError(400, 'User Sudah Tersedia');

      const hashPassword = await bcrypt.hash(dataValidated.password, bcrypt.genSaltSync(10));

      const newUser = new UserModel({
        email: dataValidated.email,
        username: dataValidated.username,
        password: hashPassword
      });

      newUser.save();
      return res.status(201).json({ code: 200, data: newUser });
    } catch (error) {
      if (error instanceof Joi.ValidationError)
        return res.status(400).json({ code: 400, message: error.details[0].message });

      if (error instanceof ValidationError) return res.status(error.getCode()).json(error.getCodeAndMessage());

      return res.send('something error');
    }
  }

  public async SignIn(req: Request, res: Response) {
    try {
      const dataValidated = await UserValidation.SignInValidation(req.body);

      const user = await UserModel.findOne({ username: dataValidated.username });
      if (!user) throw new ValidationError(404, 'User Tidak Ditemukan');

      const checkPassword = bcrypt.compareSync(dataValidated.password, user.password);
      if (!checkPassword) throw new ValidationError(400, 'Username atau Passwrod Salah');

      // create session
      const token_user = jwt.sign({ username: user.username }, process.env.PUBLIC_TOKEN as string, { expiresIn: '3d' });

      res.cookie('token_user', token_user, { maxAge: ms('3d') });
      return res.status(201).json({ code: 201, message: 'Authenticated' });
    } catch (error) {
      if (error instanceof Joi.ValidationError)
        return res.status(400).json({ code: 400, message: error.details[0].message });

      if (error instanceof ValidationError) return res.status(error.getCode()).json(error.getCodeAndMessage());

      return res.send('something error');
    }
  }

  public GetUser(req: Request, res: Response): Response {
    return res.send('Get User');
  }
}

export default new UserController();
