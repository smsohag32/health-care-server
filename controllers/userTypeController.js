import UserType from "../models/UserType.js";

export const createUserType = async (req, res) => {
   try {
      const { name, description, permissions } = req.body;

      const existingUserType = await UserType.findOne({ name });
      if (existingUserType) {
         return res.status(400).json({ message: "UserType with this name already exists." });
      }

      const newUserType = new UserType({
         name,
         description,
         permissions,
      });

      // Save UserType to database
      const savedUserType = await newUserType.save();
      return res.status(201).json({
         message: "UserType created successfully.",
         userType: savedUserType,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "An error occurred while creating UserType.",
      });
   }
};

// Get all UserTypes
export const getAllUserTypes = async (req, res) => {
   try {
      const userTypes = await UserType.find();
      return res.status(200).json(userTypes);
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "An error occurred while retrieving UserTypes.",
      });
   }
};

// Get a UserType by ID
export const getUserTypeById = async (req, res) => {
   try {
      const { id } = req.params;

      const userType = await UserType.findById(id);
      if (!userType) {
         return res.status(404).json({ message: "UserType not found." });
      }

      return res.status(200).json(userType);
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "An error occurred while retrieving UserType.",
      });
   }
};

// Update a UserType by ID
export const updateUserType = async (req, res) => {
   try {
      const { id } = req.params;
      const { name, description, permissions } = req.body;

      const userType = await UserType.findById(id);
      if (!userType) {
         return res.status(404).json({ message: "UserType not found." });
      }

      userType.name = name || userType.name;
      userType.description = description || userType.description;
      userType.permissions = permissions || userType.permissions;

      const updatedUserType = await userType.save();
      return res.status(200).json({
         message: "UserType updated successfully.",
         userType: updatedUserType,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "An error occurred while updating UserType.",
      });
   }
};

export const deleteUserType = async (req, res) => {
   try {
      const { id } = req.params;

      const userType = await UserType.findByIdAndDelete(id);
      if (!userType) {
         return res.status(404).json({ message: "UserType not found." });
      }

      return res.status(200).json({
         message: "UserType deleted successfully.",
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "An error occurred while deleting UserType.",
      });
   }
};
