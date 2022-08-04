import {
  BelongsToAssociation,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UsersModel } from '../users/users.model';
import { UsersRolesModel } from './users-roles.model';

interface UserCreationAttributes {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class RolesModel extends Model<RolesModel, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  value: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => UsersModel, () => UsersRolesModel)
  users: UsersModel[];
}
