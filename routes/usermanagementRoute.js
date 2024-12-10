import { Router } from "express";
import {
   createEmployee,
   deleteEmployee,
   getAllEmployees,
   getEmployee,
} from "../controllers/employeeController.js";
import {
   createUserType,
   deleteUserType,
   getAllUserTypes,
   getUserTypeById,
   reactivateUserType,
   updateUserType,
} from "../controllers/userTypeController.js";
import {
   createDepartment,
   getDepartments,
   getDepartmentById,
   updateDepartment,
   deleteDepartment,
   reactivateDepartment,
} from "../controllers/deptController.js";
import { verifyToken } from "../config/verifyToken.js";
import { getPermissions } from "../controllers/userController.js";

const router = Router();

router.get("/employees/all", getAllEmployees);
router.get("/employee/:id", getEmployee);
router.post("/employee/add", createEmployee);
router.delete("/employees/delete/:id", deleteEmployee);

// Create a new department
router.post("/department/add", createDepartment);

// Get all departments (Active and Inactive)
router.get("/department/all", getDepartments);

// Get a specific department by ID
router.get("/department/:id", getDepartmentById);

// Update a department by ID
router.put("/department/edit/:id", updateDepartment);

// Soft delete a department (mark as inactive)
router.delete("/department/delete/:id", deleteDepartment);

// Reactivate a soft-deleted department (mark as active)
router.put("/department/reactivate/:id", reactivateDepartment);

// Create a new UserType (or reactivate an existing one)
router.post("/usertype/add", createUserType);

// Get all active UserTypes
router.get("/usertype/all", getAllUserTypes);

// Get a UserType by ID
router.get("/usertype/:id", getUserTypeById);

// Update a UserType by ID
router.put("/usertype/edit/:id", updateUserType);

// Soft delete a UserType by ID (mark as inactive)
router.delete("/usertype/delete/:id", deleteUserType);

// Reactivate a UserType (only for inactive ones)
router.put("/usertype/reactivate/:id", reactivateUserType);
// permission
router.get("/permissions/all", getPermissions);

export default router;
