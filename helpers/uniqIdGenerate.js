import User from "../models/User.js";

export const generateUniqueUserId = async (firstName, phoneNo) => {
   let userId = `${firstName.toLowerCase()}${phoneNo.slice(-4)}`;

   // Ensure the userId length is between 6 and 10 characters
   if (userId.length < 6 || userId.length > 10) {
      userId = `${firstName.toLowerCase().slice(0, 3)}${phoneNo.slice(-3)}`;
   }

   // Check if the userId already exists in the database
   let existingUser = await User.findOne({ userId });

   let counter = 1;
   while (existingUser) {
      userId = `${userId.slice(0, 6)}${counter}`;
      existingUser = await User.findOne({ userId });
      counter++;
   }

   return userId;
};
