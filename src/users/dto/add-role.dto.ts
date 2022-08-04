import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'значение должно быть строкой' })
  readonly role: string;

  @IsNumber({}, { message: 'значение должно быть числом' })
  readonly userId: number;
}
