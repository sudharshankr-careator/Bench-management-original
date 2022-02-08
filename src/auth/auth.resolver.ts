import { Res } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { LoginInput } from 'src/user/dto/login-user.inpt';
import { Jwt, User } from './../user/entities/user.entity';
import { AuthService } from './auth.service';
import { ForgotDto } from './dto/forgot.dto';
//export type JwtUser = { token: string; userId: string };

@Resolver(() => Jwt || User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Jwt)
  async login(
    @Args('login') login: LoginInput,
    @Res() res: Response,
  ): Promise<Jwt> {
    const token = await this.authService.login(login);

    return token;
  }

  @Mutation(() => User)
  async forgotpassword(@Args('forgot') forgot: ForgotDto) {
    const user = await this.authService.forgotPassword(forgot);
    return user;
  }
}
