import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
   {
      employeeID: {
         type: String,
         unique: true,
      },
      firstName: {
         type: String,
         required: true,
      },
      lastName: {
         type: String,
      },
      email: {
         type: String,
         unique: false,
         require: false,
      },
      phoneNo: {
         type: String,
         required: true,
         unique: true,
         match: [/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number format"],
      },
      department: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "departments",
         required: true,
      },
      jobTitle: {
         type: String,
         required: true,
      },
      salary: {
         type: Number,
         required: true,
         min: 0,
      },
      hireDate: {
         type: Date,
         default: Date.now,
      },
      address: {
         street: { type: String, required: true },
         city: { type: String, required: true },
         state: { type: String, required: true },
         postalCode: { type: String, required: true },
         country: { type: String, required: true },
      },
      emergencyContact: {
         name: { type: String, required: true },
         relationship: { type: String, required: true },
         phoneNo: { type: String, required: true },
      },
      status: {
         type: String,
         enum: ["Active", "Inactive", "On Leave", "Retired"],
         default: "Active",
      },
      userType: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "usertypes",
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

employeeSchema.pre("save", async function (next) {
   if (this.isNew) {
      try {
         const count = await mongoose.models.employees.countDocuments();
         this.employeeID = `EMP${(count + 1).toString().padStart(3, "0")}`;
         next();
      } catch (error) {
         next(error);
      }
   } else {
      next();
   }
});

const Employee = mongoose.models.employees || mongoose.model("employees", employeeSchema);

export default Employee;
