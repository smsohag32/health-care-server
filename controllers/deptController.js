import Department from "../models/Department.js";

export const createDepartment = async (req, res) => {
   try {
      const { name, description, numberOfEmployees = 0, hod, status = "Active" } = req.body;

      const departmentExists = await Department.findOne({ name });
      if (departmentExists) {
         return res.status(400).json({ message: "Department with this name already exists." });
      }
      const lastDept = await Department.findOne().sort({ createdAt: -1 });
      const deptID = lastDept
         ? `D${(parseInt(lastDept.deptID.slice(1)) + 1).toString().padStart(3, "0")}`
         : "D001";

      const newDepartment = new Department({
         deptID,
         name,
         description,
         numberOfEmployees,
         hod,
         status,
      });

      const savedDepartment = await newDepartment.save();

      res.status(201).json({
         message: "Department created successfully",
         department: savedDepartment,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const getDepartments = async (req, res) => {
   try {
      const departments = await Department.find();
      res.status(200).json(departments);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const getDepartmentById = async (req, res) => {
   try {
      const { id } = req.params;
      const department = await Department.findById(id);
      if (!department) return res.status(404).json({ message: "Department not found" });
      res.status(200).json(department);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const updateDepartment = async (req, res) => {
   try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedDepartment = await Department.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedDepartment) return res.status(404).json({ message: "Department not found" });
      res.status(200).json(updatedDepartment);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const deleteDepartment = async (req, res) => {
   try {
      const { id } = req.params;
      const result = await Department.findByIdAndDelete(id);
      if (!result) return res.status(404).json({ message: "Department not found" });
      res.status(200).json({ message: "Department deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
