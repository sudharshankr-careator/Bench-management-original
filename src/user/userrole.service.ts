import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRoleInput } from './dto/create-userrole.input';
import { UpdateUserRoleInput } from './dto/update-userrole.input';
import { UserRole } from './entities/userrole.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole) private userroleRepo: Repository<UserRole>,
  ) {}
  async create(createuserroleInput: CreateUserRoleInput) {
    const ROLE = await this.userroleRepo.create(createuserroleInput);

    return this.userroleRepo.save(ROLE);
  }

  findAll() {
    return this.userroleRepo.find();
  }

  findOne(id: number) {
    return this.userroleRepo.findOne(id);
  }

  async update(userupdate: UpdateUserRoleInput) {
    const UP = await this.userroleRepo.create(userupdate);
    return this.userroleRepo.update(userupdate.id, userupdate);
  }

  async remove(id: number) {
    return this.userroleRepo.delete(id);
  }
  findbyuserid(userid: string) {
    console.log(userid, 'pp');

    return this.userroleRepo.findOne({ userid });
  }

  findbyroleid(roleid: number) {
    return this.userroleRepo.find({
      where: {
        roleid,
      },
    });
  }
}
