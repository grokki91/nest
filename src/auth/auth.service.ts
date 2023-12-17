import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateDtoUser } from 'src/users/dto/create-user';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);

    if (user) {
      return this.createToken(user);
    }
  }

  public async register(dto: RegisterDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await bcrypt.hash(dto.password, 5);
    const newUser = await this.userService.createUser({
      ...dto,
      password: hash,
    });

    return this.createToken(newUser);
  }

  public async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    const passwordEquals = await bcrypt.compare(password, user.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException('Invalid email or password');
  }

  public createToken(user: CreateDtoUser) {
    const payload = {
      email: user.email,
      firstName: user.firstName,
    };
    return { token: `Bearer ${this.jwtService.sign(payload)}` };
  }
}
