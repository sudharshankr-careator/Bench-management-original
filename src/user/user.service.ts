import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserRoleService } from './userrole.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly userrole: UserRoleService,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const {
      email,
      firsttimelogin,
      isactive,
      mobile,
      passwordhash,
      profilepicture,
      usertoken,
      username,
      lastlogin,
      roleid,
    } = createUserInput;
    let passd = '12345';
    const pass = await this.hashPassword(passd);
    const user = await this.userRepo.create({
      email,
      passwordhash: pass,
      mobile,
      username,
      profilepicture,
      lastlogin,
      firsttimelogin,
      isactive,
      usertoken,
    });
    const USER = await this.userRepo.save(user);
    const role = await this.userrole.create({
      roleid,
      userid: USER.userid,
    });
    console.log(role);

    return USER;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
  findAll() {
    return this.userRepo.find({
      relations: ['userrole'],
    });
  }

  findOne(userid: string) {
    return this.userRepo.findOne(userid, {
      relations: ['userrole'],
    });
  }
  async update(updateUserInput: UpdateUserInput) {
    const u = await this.userRepo.create(updateUserInput);
    await this.userRepo.update(updateUserInput.userid, u);
    const USER = await this.userRepo.findOne(updateUserInput.userid);
    return USER;
  }
  async updateToken(userid: string, usertoken: string) {
    await this.userRepo.update(userid, { usertoken });
    const USER = await this.userRepo.findOne(userid);
    return USER;
  }
  async updatePassword(updateUserInput: UpdateUserInput) {
    const passwordhash = await this.hashPassword(updateUserInput.passwordhash);
    return this.userRepo.update(updateUserInput.userid, {
      passwordhash,
      firsttimelogin: false,
    });
  }

  remove(userid: string) {
    return this.userRepo.delete(userid);
  }

  findUser(email: string) {
    return this.userRepo.findOne({ email });
  }
  findUserByMobile(mobile: string) {
    return this.userRepo.findOne({ mobile });
  }
}
