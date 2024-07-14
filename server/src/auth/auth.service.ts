import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '../types/types';

@Injectable()
export class AuthService {
  constructor (
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser (email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException('User was not found');

    const passwordMatch = await argon2.verify(user.password, pass);

    if (user && passwordMatch) return user;

    return new UnauthorizedException();
  }

  async login (user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
