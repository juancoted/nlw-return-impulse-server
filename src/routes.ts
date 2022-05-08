import express from 'express'
import { SubmitFeedbackUseCase } from './use-cases/submitFeedbackUseCase';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';

export const routes = express();

;

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    //possibilita usar a sintaxe curta no objeto data ao inves de req.body.type

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    );

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })



    return res.status(201).send()
})