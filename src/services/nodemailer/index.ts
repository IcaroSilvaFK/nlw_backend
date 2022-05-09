import nodemailer from "nodemailer";
import { IMailServeice, SendMailData } from "../mail-service";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "09d11945c5b2e8",
    pass: "c834305a6bdcac",
  },
});

export class NodemailerMailAdapter implements IMailServeice {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: "Equiper feedget <oi@feedget.com>",
      to: "Icaro Vieira <iv2484706@gmail.com>",
      subject,
      html: body,
    });
  }
}
