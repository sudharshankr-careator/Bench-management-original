import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { CreateResourceInput } from './dto/create-resource.input';
import { UpdateResourceInput } from './dto/update-resource.input';
import { Resource } from './entities/resource.entity';
import { ResourcesService } from './resources.service';
@Resolver(() => Resource)
export class ResourcesResolver {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly userServie: UserService,
  ) {}

  @Mutation(() => Resource)
  createResource(
    @Args('createResourceInput') createResourceInput: CreateResourceInput,
  ) {
    return this.resourcesService.create(createResourceInput);
  }

  @Query(() => [Resource], { name: 'allresources' })
  findAll() {
    return this.resourcesService.findAll();
  }
  @Query(() => [Resource])
  findActiveAndInActiveResource(@Args('isactive') isactive: boolean) {
    return this.resourcesService.findActiveResource(isactive);
  }

  @Query(() => [Resource], { name: 'findbyAccountManger' })
  findbyAccountManger(@Args('accountmanagerid') accountmanagerid: string) {
    return this.resourcesService.findbyAccountManger(accountmanagerid);
  }
  @Query(() => Resource)
  findByEmail(@Args('careatoremail') careatoremail: string) {
    return this.resourcesService.findByEmail(careatoremail);
  }
  @Query(() => Number)
  findAMACount(@Args('accountmanagerid') accountmanagerid: string) {
    return this.resourcesService.findAMACount(accountmanagerid);
  }

  @Query(() => Number)
  findAMVCount(@Args('accountmanagerid') accountmanagerid: string) {
    return this.resourcesService.findAMVCount(accountmanagerid);
  }
  @Query(() => Number)
  findAMBCount(@Args('accountmanagerid') accountmanagerid: string) {
    return this.resourcesService.findAMBCount(accountmanagerid);
  }
  @Query(() => Number)
  findAMLCount(@Args('accountmanagerid') accountmanagerid: string) {
    return this.resourcesService.findAMLCount(accountmanagerid);
  }
  @Query(() => Number)
  findACount() {
    return this.resourcesService.findACount();
  }

  @Query(() => Number)
  findVCount() {
    return this.resourcesService.findVCount();
  }
  @Query(() => Number)
  findBCount() {
    return this.resourcesService.findBCount();
  }
  @Query(() => Number)
  findLCount() {
    return this.resourcesService.findLCount();
  }

  @Query(() => Resource, { name: 'resource' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.resourcesService.findOne(id);
  }

  @Mutation(() => Resource)
  updateResource(
    @Args('updateResourceInput') updateResourceInput: UpdateResourceInput,
  ) {
    return this.resourcesService.update(
      updateResourceInput.id,
      updateResourceInput,
    );
  }

  @Mutation(() => Resource)
  removeResource(@Args('id', { type: () => Int }) id: number) {
    return this.resourcesService.remove(id);
  }
}
