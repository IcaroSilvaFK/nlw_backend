import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// spies = espiões saber se uma função realmente foi chamada

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "exemple comment",
        screenshot: "data:image/png;base64,clasnclksanclknsalnclsanlcnasln",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
  it("should not be able to submit feeback whithout type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "exemple comment",
        screenshot: "data:image/png;base64,clasnclksanclknsalnclsanlcnasln",
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit feeback whithout comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,clasnclksanclknsalnclsanlcnasln",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feeback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "bugado",
        screenshot: "cacaskmcs",
      })
    ).rejects.toThrow();
  });
});
