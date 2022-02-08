import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDocumentInput {
  @Field({ nullable: true })
  documenttype: string;

  @Field({ nullable: true })
  documentname: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  fileurl: string;

  @Field({ nullable: true })
  filename: string;

  @Field({ nullable: true })
  fileextension: string;

  @Field({ nullable: true })
  remarks: string;

  @Field({ nullable: true })
  createdby?: string;

  @Field({ nullable: true })
  updatedby?: string;

  @Field({ nullable: true })
  isactive?: boolean;

  @Field({ nullable: true })
  resourceid?: number;
}
