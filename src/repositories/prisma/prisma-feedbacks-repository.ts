import { prisma } from "../../prisma";
import {
  IFeedbackCreateData,
  IFeedbacksRepository,
} from "../feedbacks-repositories";

export class PrismaFeedbackRepository implements IFeedbacksRepository {
  async create({ comment, type, screenshot }: IFeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        comment,
        screenshot,
        type,
      },
    });
  }
}
