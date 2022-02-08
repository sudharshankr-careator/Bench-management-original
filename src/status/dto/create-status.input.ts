import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStatusInput {
  @Field()
  statuscode: string;
  @Field()
  status: string;

  @Field({ nullable: true })
  createdby?: string;

  @Field({ nullable: true })
  updatedby?: string;

  @Field({ nullable: true })
  isactive?: boolean;
}
