import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}
  async create(createroleInput: CreateRoleInput) {
    const ROLE = await this.roleRepo.create(createroleInput);
    return this.roleRepo.save(ROLE);
  }

  findAll() {
    return this.roleRepo.find();
  }

  findOne(id: number) {
    return this.roleRepo.findOne(id);
  }

  findRole(role: string) {
    return this.roleRepo.findOne({
      role,
    });
  }
  async update(id: number, updateRoleInput: UpdateRoleInput) {
    const ROLE = await this.roleRepo.create(updateRoleInput);
    return this.roleRepo.update(id, ROLE);
  }

  async remove(id: number) {
    return this.roleRepo.delete(id);
  }
}
