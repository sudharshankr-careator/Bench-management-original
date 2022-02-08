import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { mailSubject } from 'src/constants/mailsubject-constants';
import { Role } from 'src/user/entities/role.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from './../user/entities/userrole.entity';
import { UserService } from './../user/user.service';
import { ForgotDto } from './dto/forgot.dto';
import { MailService } from './mail/mail.service';
const logger = new Logger();
export type JwtUser = {
  token: string;
  userid: string;
  username: string;
  email: string;
  role: string;
  firsttimelogin: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailservice: MailService,
    @InjectRepository(UserRole) private readonly userrole: Repository<UserRole>,
    @InjectRepository(Role) private readonly role: Repository<Role>,
  ) {}
  async validateUser(login: { email: string; passwordhash: string }) {
    const user = await this.userService.findUser(login.email);

    if (!user) {
      throw new HttpException({ message: 'Email Not Found' }, 401);
    }

    // const isVerified = await bcrypt.compare(login.password, user.password);
    // logger.log('Password', login.password);
    const p = await this.hashPassword(login.passwordhash);

    const isVerified = await bcrypt.compare(
      login.passwordhash,
      user.passwordhash,
    );
    if (!isVerified) {
      throw new HttpException({ message: 'Invalid login details' }, 401);
    }
    return user;
  }
  async forgotPassword(forgot: ForgotDto) {
    const token = uuidv4();
    const user = await this.userService.findUser(forgot.email);

    if (!user) {
      throw new HttpException({ message: 'Email Not Found' }, 401);
    }
    await this.mailservice.passwordReset(
      user,
      token,
      mailSubject.forgotPassword,
      forgot.host1,
    );
    await this.userService.updateToken(user.userid, token);
    return user;
  }

  async login(login: { email: string; passwordhash: string }) {
    const user = await this.validateUser(login);
    console.log(user);

    const USERROLE = await this.userrole.findOne({ userid: user.userid });
    console.log(USERROLE, 'll');

    const ROLE = await this.role.findOne(USERROLE.roleid);

    const payload = {
      username: user.username,
      userid: user.userid,
      email: user.email,
      mobile: user.mobile,
      role: ROLE.role,
      firsttimelogin: user.firsttimelogin,
    };

    logger.log('LoggedIn User', JSON.stringify(user));
    const token = await this.jwtService.sign(payload);

    const login1: JwtUser = {
      token: token,
      userid: user.userid,
      username: user.username,
      email: user.email,
      role: ROLE.role,
      firsttimelogin: user.firsttimelogin,
    };
    return login1;
  }
  async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
