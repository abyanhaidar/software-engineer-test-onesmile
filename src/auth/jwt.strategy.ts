import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // reads token from Authorization header
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key', // match with the key used to sign token
    });
  }

  async validate(payload: any): Promise<Partial<User>> {
    // attach this to req.user
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
