export interface SendMailData {
  subject: string;
  body: string;
}

export interface IMailServeice {
  sendMail: (data: SendMailData) => Promise<void>;
}
