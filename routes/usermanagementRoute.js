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
   updateUserType,
} from "../controllers/userTypeController.js";
import {
   createDepartment,
   deleteDepartment,
   getDepartmentById,
   getDepartments,
} from "../controllers/deptController.js";

const router = Router();

router.get("/employees/all", getAllEmployees);
router.get("/employee/:id", getEmployee);
router.post("/employees/add", createEmployee);
router.delete("/employees/delete/:id", deleteEmployee);

router.post("/department/add", createDepartment);
router.get("/department/all", getDepartments);
router.get("/department/:id", getDepartmentById);
router.delete("/department/delete/:id", deleteDepartment);

router.post("/usertype/add", createUserType);
router.get("/usertype/all", getAllUserTypes);
router.delete("/usertype/delete/:id", deleteUserType);
router.put("/usertype/edit/:id", updateUserType);

export default router;
