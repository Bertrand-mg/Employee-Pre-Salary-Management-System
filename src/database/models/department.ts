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

  public toJSON = () => {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  };
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
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      deletedAt: {
        type: DataTypes.DATE,
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
