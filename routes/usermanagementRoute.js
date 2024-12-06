import { Router } from "express";
import {
   createEmployee,
   deleteEmployee,
   getAllEmployees,
} from "../controllers/employeeController.js";
import {
   createUserType,
   deleteUserType,
   getAllUserTypes,
} from "../controllers/userTypeController.js";
import {
   createDepartment,
   getDepartmentById,
   getDepartments,
} from "../controllers/deptController.js";

const router = Router();

router.get("/employees/all", getAllEmployees);
router.post("/employees/add", createEmployee);
router.delete("/employees/delete/:id", deleteEmployee);

router.post("/department/add", createDepartment);
router.get("/department/all", getDepartments);
router.get("/department/:id", getDepartmentById);

router.post("/usertype/add", createUserType);
router.get("/usertype/all", getAllUserTypes);
router.delete("/usertype/delete/:id", deleteUserType);

export default router;
