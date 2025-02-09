import { ENV } from "config/env";
import nodemailer from "nodemailer";

interface SendMailOptions {
  to: string;
  subject: string;
  text: string;
}

export class Mailer {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: ENV.MAIL_HOST,
      port: ENV.MAIL_PORT,
      secure: false, // SSL?
      auth: {
        user: ENV.MAIL_USER,
        pass: ENV.MAIL_PASS,
      },
    });
  }

  async sendMail(options: SendMailOptions) {
    await this.transporter.sendMail({ from: ENV.MAIL_FROM, ...options });
  }
}
