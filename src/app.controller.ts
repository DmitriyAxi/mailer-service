import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';

@Controller()
export class AppController {
  private transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 1025,
  });

  @EventPattern('send_mail')
  async handleSendMail(@Payload() data: any) {
    const t0 = Date.now();
    console.log('[mailer] received send_mail event:', data);

    try {
      const result = await this.transporter.sendMail({
        from: 'test@test.com',
        to: data.email,
        subject: 'Test Email',
        text: `Hello, ${data.email}. Your random number is: ${data.number}`,
      });

      console.log(`[mailer] email sent in ${Date.now() - t0}ms, messageId: ${result.messageId}`);
    } catch (e) {
      console.log(`[mailer] failed to send email after ${Date.now() - t0}ms:`, e);
    }
  }
}