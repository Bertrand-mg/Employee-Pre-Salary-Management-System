import express, { Router } from 'express';
import { DepartmentController } from '../controllers';

const departmentRoute: Router = express.Router();
const departmentController = new DepartmentController();

departmentRoute.get('/', departmentController.getAllDepartment);
departmentRoute.post('/', departmentController.createDepartment);
departmentRoute.get('/:id', departmentController.getDepartmentById);
departmentRoute.put('/:id', departmentController.updateDepartment);

departmentRoute.delete('/:id', departmentController.deleteDepartment);

export default departmentRoute;
