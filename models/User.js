import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserType from "./UserType.js";

const userSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: true,
      },
      phoneNo: {
         unique: true,
         type: String,
         required: true,
         match: [/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number format"],
      },
      userId: {
         type: String,
         unique: true,
      },
      lastName: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         lowercase: true,
         match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      },
      password: {
         type: String,
         required: true,
         minlength: 6,
      },
      userType: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "usertypes",
         required: true,
      },
      status: {
         type: Boolean,
         default: false,
      }
   },
   { timestamps: true }
);

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();

   try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
   } catch (error) {
      next(error);
   }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
   return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre("save", async function (next) {
   const userType = await UserType.findById(this.userType);
   if (userType && userType.permissions) {
      this.permissionList = userType.permissions;
   }
   next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
