import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStatusInput } from './dto/create-status.input';
import { UpdateStatusInput } from './dto/update-status.input';
import { Status } from './entities/status.entity';
import { StatusService } from './status.service';

@Resolver(() => Status)
export class StatusResolver {
  constructor(private readonly statusService: StatusService) {}

  @Mutation(() => Status)
  createStatus(
    @Args('createStatusInput') createStatusInput: CreateStatusInput,
  ) {
    return this.statusService.create(createStatusInput);
  }

  @Query(() => [Status], { name: 'allstatuss' })
  findAll() {
    return this.statusService.findAll();
  }

  @Query(() => Status, { name: 'status' })
  findOne(@Args('statuscode') statuscode: string) {
    return this.statusService.findOne(statuscode);
  }

  @Mutation(() => Status)
  updateStatus(
    @Args('updateStatusInput') updateStatusInput: UpdateStatusInput,
  ) {
    return this.statusService.update(
      updateStatusInput.statuscode,
      updateStatusInput,
    );
  }

  @Mutation(() => Status)
  removeStatus(@Args('statuscode') statuscode: string) {
    return this.statusService.remove(statuscode);
  }
}
