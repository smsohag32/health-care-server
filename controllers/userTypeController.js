import UserType from "../models/UserType.js";
import User from "../models/User.js"; // Assuming you need to update users linked to a UserType

// Create a new UserType or reactivate an existing one
export const createUserType = async (req, res) => {
   try {
      const { name, description, permissions } = req.body;

      // Check if the UserType already exists (even if inactive)
      let existingUserType = await UserType.findOne({ name });

      if (existingUserType) {
         if (!existingUserType.isActive) {
            // If it's inactive, reactivate it
            existingUserType.isActive = true;
            existingUserType.description = description || existingUserType.description;
            existingUserType.permissions = permissions || existingUserType.permissions;
            await existingUserType.save();

            return res.status(200).json({
               message: `UserType "${name}" reactivated successfully.`,
               userType: existingUserType,
            });
         } else {
            return res.status(400).json({ message: "UserType with this name already exists." });
         }
      }

      // Create a new UserType if none exists
      const newUserType = new UserType({
         name,
         description,
         permissions,
      });

      const savedUserType = await newUserType.save();
      return res.status(201).json({
         message: "UserType created successfully.",
         userType: savedUserType,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "An error occurred while creating the UserType.",
      });
   }
};

export const getAllUserTypes = async (req, res) => {
   try {
      const userTypes = await UserType.find({ isActive: true });
      return res.status(200).json(userTypes);
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "An error occurred while retrieving UserTypes.",
      });
   }
};

export const getUserTypeById = async (req, res) => {
   try {
      const { id } = req.params;

      const userType = await UserType.findById(id);
      if (!userType || !userType.isActive) {
         return res.status(404).json({ message: "UserType not found or is inactive." });
      }

      return res.status(200).json(userType);
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "An error occurred while retrieving UserType.",
      });
   }
};
// Update a UserType by ID (Only Active UserTypes can be updated)
export const updateUserType = async (req, res) => {
   try {
      const { id } = req.params;
      const { name, description, permissions } = req.body;

      const userType = await UserType.findById(id);
      if (!userType || !userType.isActive) {
         return res.status(404).json({ message: "UserType not found or is inactive." });
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

      const userType = await UserType.findById(id);
      if (!userType) {
         return res.status(404).json({ message: "UserType not found." });
      }

      userType.isActive = false;
      await userType.save();

      return res.status(200).json({
         message: `UserType "${userType.name}" marked as inactive.`,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "An error occurred while deleting the UserType.",
      });
   }
};

export const reactivateUserType = async (req, res) => {
   try {
      const { id } = req.params;

      const userType = await UserType.findById(id);
      if (!userType || userType.isActive) {
         return res.status(404).json({ message: "UserType not found or is already active." });
      }

      // Reactivate the UserType
      userType.isActive = true;
      await userType.save();

      // Optionally, update users linked to this UserType
      await User.updateMany({ userType: id }, { $set: { userType: id } });

      return res.status(200).json({
         message: `UserType "${userType.name}" reactivated successfully.`,
         userType,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         message: "An error occurred while reactivating the UserType.",
      });
   }
};
