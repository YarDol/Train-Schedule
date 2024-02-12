import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user && (await bcryptjs.compare(password, user.password))) {
      return user;
    }

    throw new BadRequestException('User password is incorrect');
  }

  async login(user: IUser) {
    const {id, email} = user
    return {
      id, 
      email, 
      token: this.jwtService.sign({id: user.id, email: user.email})
    }  
  }

}
