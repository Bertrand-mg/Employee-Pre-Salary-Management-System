import { Request, Response } from 'express';
import { DepartmentService } from '../services';
import {
  createDepartmentAttributes,
  updateDepartmentAttributes,
} from '../types';

const departmentService = new DepartmentService();

export class DepartmentController {
  getAllDepartment = async (req: Request, res: Response) => {
    const departments = await departmentService.fetchAll();
    res.json({
      message: `Departments are ${departments.length}`,
      data: departments,
    });
  };

  createDepartment = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const newDepartment: createDepartmentAttributes = {
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const data = await departmentService.insert(newDepartment);

      res.json({ message: 'Department Created Successfully', data });
    } catch (error) {
      const { message } = error as Error;
      res
        .status(500)
        .json({ message: 'Internal Server Error ', error: message });
    }
  };

  updateDepartment = async (req: Request, res: Response) => {
    try {
      const { id, name } = req.query;

      const department = await departmentService.fetchById(id as string);

      if (!department)
        return res.status(404).json({ message: 'Department not found.' });

      const updateInfo: updateDepartmentAttributes = {
        id: department.id,
        name: name as string,
        updatedAt: new Date(),
      };

      const updateCount = await departmentService.update(updateInfo);

      if (updateCount[0] <= 0)
        return res
          .status(500)
          .json({ message: 'Department not updated', data: updateCount[1] });

      res.status(200).json({
        message: 'Department updated successfully',
        data: updateCount[1],
      });
    } catch (error) {
      const { message } = error as Error;
      res
        .status(500)
        .json({ message: 'Internal Server Error ', error: message });
    }
  };
  deleteDepartment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const department = await departmentService.fetchById(id as string);

      if (!department)
        return res.status(404).json({ message: 'Department not found.' });

      const deleteCount = await departmentService.delete(id);

      if (deleteCount <= 0)
        return res.status(500).json({ message: 'Department not deleted' });

      res.status(500).json({ message: 'Department deleted' });
    } catch (error) {
      const { message } = error as Error;
      res
        .status(500)
        .json({ message: 'Internal Server Error ', error: message });
    }
  };
}
