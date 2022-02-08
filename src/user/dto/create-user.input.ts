import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  username: string;

  @Field({ nullable: true })
  passwordhash?: string;

  @IsString()
  @Field()
  mobile: string;

  @Field({ nullable: true })
  profilepicture?: string;

  @Field({ nullable: true })
  lastlogin?: Date;

  @Field({ nullable: true })
  usertoken?: string;

  @Field({ nullable: true })
  firsttimelogin?: boolean;

  @Field({ nullable: true })
  isactive?: boolean;

  @Field({ nullable: true })
  roleid?: number;
}
