import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';

@Controller()
export class AppController {
  @EventPattern('send_mail')
  async handleSendMail(@Payload() data: any) {
    console.log(data);

    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
    });

    try {
      await transporter.sendMail({
        from: 'test@test.com',
        to: data.email,
        subject: 'Test Email',
        text: 'Hello from mailer-service',
      });

      console.log('EMAIL SENT');
    } catch (e) {
      console.log(e);
    }
  }
}