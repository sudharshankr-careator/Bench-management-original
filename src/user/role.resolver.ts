import { Logger } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

const logger = new Logger();
@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  createRole(@Args('createRoleInput') createroleInput: CreateRoleInput) {
    return this.roleService.create(createroleInput);
  }

  @Query(() => [Role], { name: 'allrole' })
  findAll() {
    return this.roleService.findAll();
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.findOne(id);
  }

  @Query(() => Role, { name: 'findByRole' })
  findByRole(@Args('role') role: string) {
    return this.roleService.findRole(role);
  }

  @Mutation(() => Role)
  updateRole(@Args('updateRoleInput') updateUserInput: UpdateRoleInput) {
    return this.roleService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.remove(id);
  }
}
