import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateResourceInput {
  @Field({ nullable: true })
  fullname?: string;

  @Field({ nullable: true })
  empid?: string;

  @Field({ nullable: true })
  doj?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  primaryphonenumber?: string;

  @Field({ nullable: true })
  secondaryphonenumber?: string;

  @Field({ nullable: true })
  emailid?: string;

  @Field({ nullable: true })
  personalemailid?: string;

  @Field({ nullable: true })
  designation?: string;

  @Field({ nullable: true })
  accname?: string;

  @Field({ nullable: true })
  accountmanagerid?: string;

  @Field({ nullable: true })
  skills?: string;

  @Field({ nullable: true })
  projectreleasedate?: string;

  @Field({ nullable: true })
  projectreleasereason?: string;

  @Field({ nullable: true })
  statuscode?: string;

  @Field({ nullable: true })
  resumeid?: number;

  @Field({ nullable: true })
  createdby?: string;

  @Field({ nullable: true })
  updatedby?: string;

  @Field({ nullable: true })
  comments?: string;

  @Field({ nullable: true })
  isactive?: boolean;
  @Field({ nullable: true })
  isam?: boolean;
}
