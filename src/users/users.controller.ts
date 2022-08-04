import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/quards/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
