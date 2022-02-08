import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateUserRoleInput } from './create-userrole.input';

@InputType()
export class UpdateUserRoleInput extends PartialType(CreateUserRoleInput) {
  @Field(() => Int)
  id: number;
}
