import { Body, Controller, Get, Logger, Post, Res } from '@nestjs/common';
import { join } from 'path';
import { MailService } from 'src/auth/mail/mail.service';
const logger = new Logger();
@Controller()
export class AppController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  getHello(@Res() res: any) {
    logger.log(res, 'an');

    return res.sendFile(join(__dirname, '../frontend/build', 'index.html'));
  }
  @Post('sendmail')
  sendMail(@Body() mailerdata: any) {
    const { sendto, temp, data, subject } = mailerdata;
    console.log(data);

    return this.mailService.sendEmail(sendto, temp, data, subject);
  }
  @Post('sendmailrm')
  sendMailrm(@Body() mailerdata: any) {
    const { sendto, temp, data, subject } = mailerdata;
    console.log(data);

    return this.mailService.sendEmailRM(sendto, temp, data, subject);
  }
}
