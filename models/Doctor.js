import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
   firstName: {
      type: String,
   },
   lastName: {
      type: String,
   },
   title: {
      type: String,
   },
   specialty: {
      type: Array,
   },
   phone: {
      type: String,
      unique: true,
   },
   email: {
      type: String,
      unique: true,
   },
   address: {
      type: String,
   },
   hospital: {
      type: String,
   },
   availableFrom: {
      type: Date,
   },
   availableTo: {
      type: Date,
   },
   profilePicture: {
      type: String,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
