import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/user.schema';
import { UserService } from 'src/users/users.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(UserService) private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.secret,
    });
  }

  async validate(payload: any): Promise<User> {
    try {
      const user = await this.userService.getUserByEmail(payload.email);
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
}
