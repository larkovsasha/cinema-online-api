import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getSequelizeConfig } from './configs/sequelize.config';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getSequelizeConfig,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
