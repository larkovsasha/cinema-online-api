import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RolesModel } from './roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RolesModel) private roleRepository: typeof RolesModel,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }
  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
