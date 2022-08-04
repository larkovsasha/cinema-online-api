import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { RolesModel } from '../roles/roles.model';
import { UsersRolesModel } from '../roles/users-roles.model';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class UsersModel extends Model<UsersModel, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isBanned: boolean;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   defaultValue: false,
  // })
  // isAdmin: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason?: string;

  @BelongsToMany(() => RolesModel, () => UsersRolesModel)
  roles: RolesModel[];
}
