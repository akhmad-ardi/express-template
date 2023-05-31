import 'dotenv/config';
import mongoose from 'mongoose';
import { logger } from '../utils/Logger';

class Database {
  private URI: string;

  constructor() {
    this.URI = process.env.DB as string;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.URI);
      logger.info('Database Connected');
    } catch (error) {
      logger.error(error);
    }
  }
}

export default new Database();
