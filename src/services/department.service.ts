import {
  Department,
  departmentAttributes,
} from '../database/models/department';
import {
  createDepartmentAttributes,
  updateDepartmentAttributes,
} from '../types';

export class DepartmentService {
  fetchAll = async () => {
    const departments = await Department.findAll();
    return departments;
  };

  fetchById = async (id: string) => {
    const department = (await Department.findOne({
      where: { id },
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
    const [updated] = await Department.update(
      { ...department },
      { where: { id: department.id } },
    );
    return [updated];
  };

  delete = async (id: string) => {
    const deletedCount = await Department.destroy({
      where: { id },
    });
    return deletedCount;
  };
}
