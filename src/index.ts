import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// database
import db from './config/database.config';

// routes
import User from './routes/user.route';

// utils
import { logger } from './lib/Logger';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    // Configure middleware and set other app
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.app.use(cors());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });

    db.connect();
  }

  private routes(): void {
    // Define routes for you app
    this.app.use('/api/user', User.routes);
  }

  public start(): void {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  }
}

const app = new App();
app.start();