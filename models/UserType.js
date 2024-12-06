import mongoose from "mongoose";

const userTypeSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   description: {
      type: String,
      required: true,
   },
   permissions: {
      type: [String],
      default: [],
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
});

const UserType = mongoose.models.usertypes || mongoose.model("usertypes", userTypeSchema);

export default UserType;
