import { Request, Response } from 'express';
import { DepartmentService } from '../services';
import {
  createDepartmentAttributes,
  deleteDepartmentAttributes,
  updateDepartmentAttributes,
} from '../types';

const departmentService = new DepartmentService();

export class DepartmentController {
  getAllDepartment = async (req: Request, res: Response) => {
    const departments = await departmentService.fetchAll();
    res.status(200).json({
      message: `Departments are ${departments.length}`,
      data: departments,
    });
  };

  getDepartmentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('id is ', id);
    const department = await departmentService.fetchById(id);
    if (!department)
      return res.status(404).json({
        message: `Department not Found`,
      });
    res.status(200).json({
      message: `Department Found`,
      data: department,
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

      res
        .status(200)
        .json({ message: 'Department Created Successfully', data });
    } catch (error) {
      const { message } = error as Error;
      res
        .status(500)
        .json({ message: 'Internal Server Error ', error: message });
    }
  };

  updateDepartment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const department = await departmentService.fetchById(id as string);

      if (!department)
        return res.status(404).json({ message: 'Department not found.' });

      const updateInfo: updateDepartmentAttributes = {
        id: department.id,
        name: name as string,
      };

      const [updateCount, updateData] =
        await departmentService.update(updateInfo);

      if ((updateCount as number) <= 0)
        return res.status(500).json({ message: 'No Department updated' });

      res.status(200).json({
        message: 'Department updated successfully',
        data: updateData,
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

      const deleteInfo: deleteDepartmentAttributes = {
        id: department.id,
        deletedAt: new Date(),
      };

      const [deleteCount, deletedData] =
        await departmentService.delete(deleteInfo);
      console.log('success');

      if ((deleteCount as number) <= 0)
        return res.status(500).json({ message: 'No department deleted' });

      res
        .status(200)
        .json({ message: 'Department deleted', data: deletedData });
    } catch (error) {
      const { message } = error as Error;
      res
        .status(500)
        .json({ message: 'Internal Server Error ', error: message });
    }
  };
}
