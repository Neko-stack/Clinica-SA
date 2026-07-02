import type { Request, Response } from "express";
import type { Prontuario } from "../prisma/generated/prisma";
import {
    prontuarioService,
    ProntuarioService
} from "../services/ProntuarioService";

class ProntuarioController {
    constructor(
        private readonly service: ProntuarioService
    ) {}

    async listarTodosProntuarios(
        req: Request,
        res: Response
    ) {
        try {
            const prontuarios =
                await this.service.listarTodosProntuarios();

            return res.status(200).json(prontuarios);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async buscarProntuarioId(
        req: Request,
        res: Response
    ) {
        try {
            const prontuario =
                await this.service.buscarProntuarioId(
                    Number(req.params.id)
                );

            return res.status(200).json(prontuario);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async criarProntuario(
        req: Request,
        res: Response
    ) {
        try {
            const prontuario =
                await this.service.criarProntuario(
                    req.body as Prontuario
                );

            return res.status(201).json(prontuario);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async atualizarProntuario(
        req: Request,
        res: Response
    ) {
        try {
            const prontuario =
                await this.service.atualizarProntuario(
                    Number(req.params.id),
                    req.body
                );

            return res.status(200).json(prontuario);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async deletarProntuario(
        req: Request,
        res: Response
    ) {
        try {
            const prontuario =
                await this.service.deletarProntuario(
                    Number(req.params.id)
                );

            return res.status(200).json({
                mensagem: "Prontuário deletado com sucesso!",
                data: prontuario
            });
        } catch (error) {
            return res.status(404).json({ error });
        }
    }
}

export const prontuarioController =
    new ProntuarioController(prontuarioService);