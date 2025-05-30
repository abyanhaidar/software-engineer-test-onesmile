import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'onesmile-abyan', // fill in the secret key
    });
  }

  async validate(payload: any): Promise<Partial<User>> {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
