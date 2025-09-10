import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { UserEntity } from '@/user/user.entity';
import 'dotenv/config';
import { ITokenPayload } from '@/user/interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(_: any, payload: ITokenPayload): Promise<UserEntity> {
    const user = await this.userService.findByEmail(payload.email);
    if (!user || !user.is_active) {
      throw new UnauthorizedException('Usuário inválido ou inativo');
    }
    return user;
  }
}
