import { IFeedbacksRepository } from "../repositories/feedbacks-repositories";
import { IMailServeice } from "../services/mail-service";

interface ISubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailAdapter: IMailServeice
  ) {}

  async execute(request: ISubmitFeedbackUseCaseRequest) {
    const { comment, type, screenshot } = request;

    if (!type) {
      throw new Error("Invalide type.");
    }

    if (!comment) {
      throw new Error("Invalide comment.");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("invalide screenshot format.");
    }

    await this.feedbacksRepository.create({
      comment,
      type,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size:16px; color:#111">`,
        `<p>Tipo do feedback: <b>${type}</b></p>`,
        `<p>Comentário:${comment}</p>`,
        screenshot ? `<img src="${screenshot}"/>` : ``,
        `</div>`,
      ].join("\n"),
    });
  }
}
