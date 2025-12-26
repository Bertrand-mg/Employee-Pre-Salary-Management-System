import { departmentAttributes } from '../database/models/department';

export type createDepartmentAttributes = Pick<
  departmentAttributes,
  'name' | 'createdAt' | 'updatedAt'
>;

export type updateDepartmentAttributes = Pick<
  departmentAttributes,
  'id' | 'name'
>;

export type deleteDepartmentAttributes = Pick<
  departmentAttributes,
  'id' | 'deletedAt'
>;
