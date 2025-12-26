import { Department, departmentAttributes } from '../database/models';
import {
  createDepartmentAttributes,
  deleteDepartmentAttributes,
  updateDepartmentAttributes,
} from '../types';

export class DepartmentService {
  fetchAll = async () => {
    const departments = await Department.findAll({
      where: { deletedAt: null },
    });
    return departments;
  };

  fetchById = async (id: string) => {
    const department = (await Department.findOne({
      where: { id, deletedAt: null },
    })) as departmentAttributes;
    return department;
  };

  fetchByName = async (name: string) => {
    const department = await Department.findOne({ where: { name } });
    return department;
  };

  insert = async (department: createDepartmentAttributes) => {
    const newDepartment = await Department.create({
      ...department,
    });

    await newDepartment.save();
    return newDepartment;
  };

  update = async (department: updateDepartmentAttributes) => {
    const [updated, [data]] = await Department.update(
      { ...department },
      { where: { id: department.id }, returning: true },
    );
    return [updated, data];
  };

  delete = async (department: deleteDepartmentAttributes) => {
    const [updated, [data]] = await Department.update(
      { ...department },
      { where: { id: department.id }, returning: true },
    );
    return [updated, data];
  };
}
