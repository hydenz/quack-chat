import mongoose from 'database/index';
import { User } from 'types/database';

const userSchema = new mongoose.Schema<User>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    pictureHash: { type: String, required: false },
  },
  { collection: 'users' }
);

const User = mongoose.model<User>('User', userSchema);

export default User;
