const dbLink = "mongodb://localhost:27017/hc_db";

import mongoose from "mongoose";

export const connectDb = async () => {
   try {
      await mongoose.connect(dbLink);
      console.log("database connected");
   } catch (error) {
      console.log("database is not connected");
      console.log(error.message);
   }
};
