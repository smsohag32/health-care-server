import { generateUniqueUserId } from "../helpers/uniqIdGenerate.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const signIn = async (req, res) => {
   try {
      const { userId, password } = req.body;

      if (!userId || !password) {
         return res.status(400).json({ message: "User ID and password are required." });
      }

      const user = await User.findOne({
         $or: [{ userId: userId }, { phoneNo: userId }],
      }).populate("userType", "name permissions");

      if (!user) {
         return res.status(404).json({ message: "User not found." });
      }

      if (!user) {
         return res.status(404).json({ message: "User not found." });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
         return res
            .status(401)
            .json({ message: "Invalid credentials. Please check your password." });
      }
      console.log("User found:", user);

      const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: "1h" });

      const { password: _, userType, ...restUser } = user.toObject();

      const userResponse = {
         ...restUser,
         userType: userType.name,
         permissions: userType.permissions,
      };

      return res.status(200).json({
         message: "Login successful.",
         token,
         user: userResponse,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "An error occurred while processing your request. Please try again later.",
      });
   }
};
export const singUp = async (req, res) => {
   try {
      const {
         firstName,
         lastName,
         email,
         password,
         phoneNo,
         status = false,
         userType = "USER",
      } = req.body;

      const isExist = await User.findOne({ email });
      if (isExist) {
         return res.status(400).json({ message: "User already exists with this email." });
      }

      const userId = await generateUniqueUserId(firstName, phoneNo);

      const newUser = new User({
         firstName,
         lastName,
         email,
         status,
         password,
         phoneNo,
         userType,
         userId: userId,
      });

      const savedUser = await newUser.save();

      res.status(201).json({
         message: "User created successfully.",
         user: savedUser,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const getAllUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const deleteUser = async (req, res) => {
   try {
      const email = req.params.email;
      const result = await User.deleteOne({ email });
      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
