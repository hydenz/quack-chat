import User from 'database/models/user';
import { User as UserType } from 'types/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import axios from 'axios';
import FormData from 'form-data';

export default class UserService {
  static async signUp(user: UserType): Promise<string | null> {
    try {
      const pseudoRandomNumber = (Math.floor(Math.random() * 10000) + 10000)
        .toString()
        .substring(1);
      user.username += `#${pseudoRandomNumber}`;
      user.password = await bcrypt.hash(user.password, 8);
      const newUser = await User.create(user);
      return newUser._id;
    } catch (e) {
      return null;
    }
  }

  static async signIn(
    user: Pick<UserType, 'username' | 'password'>
  ): Promise<string | null> {
    const { username, password } = user;
    const foundUser = await User.findOne({ username });

    if (!foundUser) return null;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isPasswordCorrect) return null;

    const accessToken = jwt.sign(
      { id: foundUser._id },
      process.env.JWT_SECRET!
    );
    return accessToken;
  }

  static async findUsers(req: Request) {
    const { id } = req.params;
    if (id) {
      const user = await User.findOne({ _id: id });
      return [user];
    }

    const { nickname }: any = req.query;
    const foundUsers = await User.find({ nickname: new RegExp(nickname, 'i') });
    return foundUsers;
  }

  static async savePicture(userId: string, base64Image: string) {
    const formData = new FormData();
    formData.append('image', base64Image);
    formData.append('type', 'base64');
    formData.append(
      'Authorization',
      `Client-ID ${process.env.IMGUR_CLIENT_ID!}`
    );
    const resp: any = await axios.post(
      'https://api.imgur.com/3/upload',
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    const pictureHash = resp.data.data.link.split('/').pop();
    await User.findByIdAndUpdate(userId, { $set: { pictureHash } });
  }
}
