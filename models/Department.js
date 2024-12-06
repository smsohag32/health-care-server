import mongoose from "mongoose";

const deptSchema = new mongoose.Schema({
   deptID: {
      type: String,
      required: true,
      unique: true,
   },
   name: {
      type: String,
      required: true,
      unique: true,
   },
   description: {
      type: String,
      required: false,
   },
   numberOfEmployees: {
      type: Number,
      default: 0,
   },
   numberOfPatients: {
      type: Number,
      default: 0,
   },
   hod: {
      type: String,
      required: false,
   },
   status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
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

const Department = mongoose.models.departments || mongoose.model("departments", deptSchema);

export default Department;
