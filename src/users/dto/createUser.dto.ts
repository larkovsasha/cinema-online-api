import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'значение должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsString({ message: 'значение должно быть строкой' })
  @Length(4, 20, {
    message: 'Длина пароля должа быть в диапозоне от 4 до 20 символов',
  })
  readonly password: string;
}
