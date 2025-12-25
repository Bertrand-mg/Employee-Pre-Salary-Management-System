import { DataTypes, Model, Sequelize } from 'sequelize';

export interface departmentAttributes {
  id?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Department
  extends Model<departmentAttributes>
  implements departmentAttributes
{
  id!: string;
  name!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt!: Date;

  association() {}
}

export const DepartmentModel = (sequelize: Sequelize) => {
  Department.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'department',
      tableName: 'departments',
    },
  );
  return Department;
};
