import { Logger } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserRoleInput } from './dto/create-userrole.input';
import { UpdateUserRoleInput } from './dto/update-userrole.input';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { UserRole } from './entities/userrole.entity';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { UserRoleService } from './userrole.service';

const logger = new Logger();
@Resolver(() => UserRole)
export class UserRoleResolver {
  constructor(
    private readonly userroleService: UserRoleService,
    private readonly userService: UserService,
    private readonly roleservice: RoleService,
  ) {}

  @Mutation(() => UserRole)
  createUserRole(
    @Args('createUserInput') createUserInput: CreateUserRoleInput,
  ) {
    return this.userroleService.create(createUserInput);
  }

  @Query(() => [UserRole], { name: 'alluserrole' })
  findAll() {
    return this.userroleService.findAll();
  }
  @Query(() => [UserRole], { name: 'findacc' })
  async findacc() {
    const ROLE = await this.roleservice.findRole('AM');
    return this.userroleService.findbyroleid(ROLE.id);
  }

  @Query(() => UserRole, { name: 'userrole' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userroleService.findOne(id);
  }

  @Mutation(() => UserRole)
  updateUserRole(
    @Args('updateUserRoleInput') updateUserInput: UpdateUserRoleInput,
  ) {
    return this.userroleService.update(updateUserInput);
  }

  @Mutation(() => UserRole)
  removeUserRole(@Args('id', { type: () => Int }) id: number) {
    return this.userroleService.remove(id);
  }
  @ResolveField(() => User)
  user(@Parent() userrole: UserRole) {
    return this.userService.findOne(userrole.userid);
  }

  @ResolveField(() => Role)
  role(@Parent() userrole: UserRole) {
    return this.roleservice.findOne(userrole.roleid);
  }
}
