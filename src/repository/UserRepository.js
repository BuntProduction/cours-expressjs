import User from "../models/User.js";

export const UserRepository = {
  async findByEmail(email) {
    return await User.findOne({ email });
  },

  // creer l'user
  async create(userData) {
    const newUser = new User(userData);
    return await newUser.save();
  },
};
