import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailConfirmation(email: string, otp: string) {
    // const url = `http:/localhost:3000/auths/signup/confirm?email=${email}&token=${token}`;

    const result = await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: '[Shop Manager] Email Verification',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: email,
        otp,
      },
    });

    return {
      ...result,
      email: email
    }
  }
}
