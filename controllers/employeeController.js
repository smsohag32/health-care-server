import Employee from "../models/Employee.js";
import UserType from "../models/UserType.js";
import Department from "../models/Department.js";

// Helper function to check if department is valid
const checkDepartmentValidity = async (departmentId) => {
   const department = await Department.findById(departmentId);
   if (!department || !department.isActive) {
      throw new Error("Department not found or inactive.");
   }
   return department;
};

// Helper function to check if userType is valid
const checkUserTypeValidity = async (userTypeId) => {
   const userType = await UserType.findById(userTypeId);
   if (!userType) {
      throw new Error("User type not found.");
   }
   return userType;
};

// Create Employee
export const createEmployee = async (req, res) => {
   try {
      const {
         employeeID,
         firstName,
         lastName,
         email,
         phoneNo,
         department,
         jobTitle,
         salary,
         address,
         emergencyContact,
         status,
         userType,
      } = req.body;

      // Validate department and userType
      await checkDepartmentValidity(department);
      await checkUserTypeValidity(userType);

      const newEmployee = new Employee({
         employeeID,
         firstName,
         lastName,
         email,
         phoneNo,
         department,
         jobTitle,
         salary,
         address,
         emergencyContact,
         status,
         userType,
      });

      const savedEmployee = await newEmployee.save();
      res.status(201).json({ message: "Employee created successfully", employee: savedEmployee });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get Employee by ID
export const getEmployee = async (req, res) => {
   try {
      const employeeId = req.params.id;
      const employee = await Employee.findById(employeeId).populate("department userType");

      if (!employee) {
         return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json(employee);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get All Employees
export const getAllEmployees = async (req, res) => {
   try {
      const employees = await Employee.find().populate("department userType");

      res.status(200).json(employees);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update Employee
export const updateEmployee = async (req, res) => {
   try {
      const employeeId = req.params.id;
      const {
         employeeID,
         firstName,
         lastName,
         email,
         phoneNo,
         department,
         jobTitle,
         salary,
         address,
         emergencyContact,
         status,
         userType,
      } = req.body;

      // Validate department and userType
      await checkDepartmentValidity(department);
      await checkUserTypeValidity(userType);

      const updatedEmployee = await Employee.findByIdAndUpdate(
         employeeId,
         {
            employeeID,
            firstName,
            lastName,
            email,
            phoneNo,
            department,
            jobTitle,
            salary,
            address,
            emergencyContact,
            status,
            userType,
         },
         { new: true }
      );

      if (!updatedEmployee) {
         return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
   try {
      const employeeId = req.params.id;
      const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

      if (!deletedEmployee) {
         return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json({ message: "Employee deleted successfully", employee: deletedEmployee });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
