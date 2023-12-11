import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';

@Controller('/api/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  public login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('signup')
  public register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }
}
