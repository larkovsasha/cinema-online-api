import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersModel } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользаватель с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordHash = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: passwordHash,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: UsersModel) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordsEquivalence = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordsEquivalence) return user;
    throw new UnauthorizedException({
      message: 'Некорректная почта или пароль',
    });
  }
}
