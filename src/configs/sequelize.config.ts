import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { UsersModel } from '../users/users.model';
import { RolesModel } from '../roles/roles.model';
import { UsersRolesModel } from '../roles/users-roles.model';

export const getSequelizeConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => {
  return {
    dialect: 'postgres',
    host: 'localhost',
    port: Number(configService.get('POSTGRES_PORT')),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    models: [UsersModel, RolesModel, UsersRolesModel],
    autoLoadModels: true,
  };
};
