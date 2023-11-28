import { Schema, model } from 'mongoose';

interface User {
  name: string;
  email?: string;
  password: string;
  userType?: 'customer';
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: String,
    password: { type: String, required: true },
    userType: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret['__v'];
      },
    },
    timestamps: true,
  }
);

export const UserModel = model<User>('User', userSchema);
