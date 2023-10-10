import User from './user.schema.js';

export default class UserCRUD {
  static async findUser(email: string) {
    const user = await User.findOne({
      email,
    });
    return user;
  }

  static async registerUser(email: string, password: string) {
    const user = await User.create({
      email,
      password,
    });

    return user;
  }
}
