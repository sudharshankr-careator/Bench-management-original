import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ForgotDto {
  @Field()
  email: string;

  @Field({ nullable: true })
  userToken?: string;

  @Field({ nullable: true })
  host1?: string;
}
