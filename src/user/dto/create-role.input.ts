import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field()
  role: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  createdBy?: string;

  @Field({ nullable: true })
  updatedBy?: string;

  @Field({ nullable: true })
  isActive?: boolean;
}
