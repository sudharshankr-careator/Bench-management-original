import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async passwordReset(user: User, token: string, subject: any, host1: any) {
    const url = `${host1}/${user.userid}/${token}`;
    return await this.mailerService.sendMail({
      to: user.email,

      subject: subject,
      template: '/confirmation',

      context: {
        name: user.email,
        url,
      },
    });
  }

  async sendEmail(sendto: string, temp: string, data: any = {}, subject: any) {
    await this.mailerService.sendMail({
      to: sendto,
      subject: subject,
      template: `/${temp}`,

      context: {
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        status: data.status,
      },
    });
  }
  async sendEmailRM(
    sendto: string,
    temp: string,
    data: any = {},
    subject: any,
  ) {
    await this.mailerService.sendMail({
      to: sendto,
      subject: subject,
      template: `/${temp}`,

      context: {
        username: data.username,
        fullname: data.fullname || '',
      },
    });
  }
}
