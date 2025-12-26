import { Sequelize } from 'sequelize';
import { Department, DepartmentModel } from './department';

interface Models {
  Department: typeof Department;
}

export const allModel = (sequelize: Sequelize): Models => {
  return { Department: DepartmentModel(sequelize) };
};

export * from './department';
