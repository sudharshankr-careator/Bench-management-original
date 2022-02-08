import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStatusInput } from './create-status.input';

@InputType()
export class UpdateStatusInput extends PartialType(CreateStatusInput) {}
