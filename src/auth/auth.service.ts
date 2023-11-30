import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateDtoUser } from 'src/users/dto/create-user';
import { User } from 'src/users/user.schema';
import { UserService } from 'src/users/users.service';
import { LoginDtoUser } from '../users/dto/login-user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(user: LoginDtoUser) {
    const existUser = this.userService.getUserByEmail(user.email);
    if (!existUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return existUser;
  }

  public async register(user: CreateDtoUser) {
    const candidate = await this.userService.getUserByEmail(user.email);
    if (candidate) {
      throw new HttpException(
        'User with this email exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await bcrypt.hash(user.password, 5);
    const newUser = await this.userService.createUser({
      ...user,
      password: hash,
    });
    return this.createToken(newUser);
  }

  public async validateUser(id: string): Promise<User> {
    const user = await this.userService.getUser(id);

    if (user) {
      return user;
    }

    return null;
  }

  public createToken(user: CreateDtoUser) {
    const payload = {
      sub: user._id,
      email: user.email,
      firstName: user.firstName,
    };
    return { token: this.jwtService.sign(payload) };
  }
}
