import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserRoleInput {
  @Field()
  roleid: number;

  @Field({ nullable: true })
  userid?: string;

  @Field({ nullable: true })
  isdefault?: boolean;
}
