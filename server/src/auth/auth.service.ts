import { UserService } from './../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2'
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService
  ){}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.UserService.findOne(email);
    const passwordIsMatched = await argon2.verify (user.password, password)

    if (user && passwordIsMatched) {
      return user
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
