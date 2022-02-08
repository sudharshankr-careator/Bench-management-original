import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  passwordhash: string;
}

@InputType()
export class JwtUser {
  @Field()
  token: string;

  @Field()
  userid: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
