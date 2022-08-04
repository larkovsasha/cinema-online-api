import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from './users.model';
import { RolesModel } from '../roles/roles.model';
import { UsersRolesModel } from '../roles/users-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([UsersModel, RolesModel, UsersRolesModel]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
