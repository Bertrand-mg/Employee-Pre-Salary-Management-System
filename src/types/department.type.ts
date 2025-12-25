import { departmentAttributes } from '../database/models/department';

export type createDepartmentAttributes = Pick<
  departmentAttributes,
  'name' | 'createdAt' | 'updatedAt'
>;

export type updateDepartmentAttributes = Pick<
  departmentAttributes,
  'id' | 'name' | 'updatedAt'
>;
