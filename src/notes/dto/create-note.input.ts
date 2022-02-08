import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  createdby: string;

  @Field({ nullable: true })
  updatedby: string;

  @Field({ nullable: true })
  resourceid: number;
  // @Field({ nullable: true })
  // statuscode: string;
}
