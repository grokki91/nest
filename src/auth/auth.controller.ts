import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDtoUser } from 'src/users/dto/create-user';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('/api/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/signin')
  public login(@Request() req) {
    return req.user;
  }

  @Post('/signup')
  public register(@Body() user: CreateDtoUser) {
    return this.authService.register(user);
  }
}
