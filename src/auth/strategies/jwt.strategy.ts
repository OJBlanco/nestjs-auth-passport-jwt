import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import config from '../../config';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: PayloadToken) {
    return payload;
  }
}
