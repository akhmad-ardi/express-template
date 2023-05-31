import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

class User {
  private userSchema: Schema<IUser>;

  constructor() {
    this.userSchema = new Schema<IUser>({
      email: { type: String, required: true, unique: true },
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true }
    });
  }

  public getModel() {
    return model<IUser>('User', this.userSchema);
  }
}

export default new User().getModel();
