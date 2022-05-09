import express, { Response, Request } from "express";
import cors from "cors";
import { SubmitFeedbackUseCase } from "../use-cases/submit-feedback-use-case";
import { PrismaFeedbackRepository } from "../repositories/prisma/prisma-feedbacks-repository";
import { NodemailerMailAdapter } from "../services/nodemailer";

const router = express.Router();

router.use(express.json());
router.use(cors());

router.get("/", (request: Request, response: Response) => {
  response.status(200).json({ name: "Whyy" });
});

router.post("/feedback", async (request: Request, response: Response) => {
  const { comment, screenshot, type } = request.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMailService = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailService
  );

  await submitFeedbackUseCase.execute({
    comment,
    screenshot,
    type,
  });
});

export { router };

/*
 * solid
 * 1-S : Single responsibility Principle
 * 2-Open/Closed Principle
 * 3-Liskov Substitution principle
 * 4-Interface Segregation Principle
 * 5-Dependecy inversion principle
 */

/*
 * 1-Cada classe/função tem uma responsabilidade única;
 * 2-Classes devem ser abertas para extensão mais fechadas para modificação;
 * 3-Nós devemos poder substituir uma classe pai por uma herança dela e tudo continuar funcionando;
 * 4-Tentar separar as interfaces que devem ser implementadas o máximo possivel;
 * 5-Inverter as dependencias da classe/função;
 */
