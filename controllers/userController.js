import User from "../models/User";

export const singUp = async (req, res) => {
   try {
      const newUser = req.body;
      const isExist = await User.findOne({ email: newUser?.email });
      if (isExist) {
         return res.status(400).json({ message: "User already exists." });
      }
      const userData = new User(newUser);

      const saveUser = await userData.save();
      res.status(201).json({ user: saveUser });
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
