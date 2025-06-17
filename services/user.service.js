import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.util.js";

class UserService {
  // Register Service Logic
  async registerUser(body) {
    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists. Please log in");
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const allowedAdmins = process.env.ADMIN_EMAILS?.split(",") || [];
      const isAdmin = allowedAdmins.includes(email);

      // const isAdmin = email === "admin@example.com";

      const user = new User({
        name,
        email,
        password: hashPassword,
        isAdmin,
      });

      const savedUser = await user.save();
      const userObj = savedUser.toObject();
      delete userObj.password;
      return userObj;
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }

  // Login Service Logic
  async loginUser(body) {
    try {
      const { email, password } = body;
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = generateToken(existingUser);

      const userObj = existingUser.toObject();
      delete userObj.password;

      return { token, user: userObj };
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }

  //Get User Profile
  async getUser(userId) {
    try {
      const existingUser = await User.findById(userId).select("-password");
      if (!existingUser) {
        throw new Error("User not found");
      }
      return existingUser;
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }

  //Update User Profile
  async updatedUser(userId, data) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      const { name, email, password } = data;

      if (name) user.name = name;
      if (email) user.email = email;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
      await user.save();
      return { name: user.name, email: user.email };
    } catch (error) {}
  }
}

export default new UserService();
