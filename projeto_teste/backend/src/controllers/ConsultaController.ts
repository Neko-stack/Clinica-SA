import type { Request, Response } from "express";
import type { Consulta } from "../prisma/generated/prisma";
import {
    consultaService,
    ConsultaService
} from "../services/ConsultaService";

class ConsultaController {
    constructor(
        private readonly service: ConsultaService
    ) {}

    async listarTodasConsultas(req: Request, res: Response) {
        try {
            const pagina = req.query.pagina
                ? Number(req.query.pagina)
                : undefined;

            const limite = req.query.limite
                ? Number(req.query.limite)
                : undefined;

            const consultas =
                await this.service.listarTodasConsultas(
                    pagina,
                    limite
                );

            return res.status(200).json(consultas);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async buscarConsultaId(req: Request, res: Response) {
        try {
            const consulta =
                await this.service.buscarConsultaId(
                    Number(req.params.id)
                );

            return res.status(200).json(consulta);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async criarConsulta(req: Request, res: Response) {
        try {
            const consulta =
                await this.service.criarConsulta(
                    req.body as Consulta
                );

            return res.status(201).json(consulta);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async atualizarConsulta(req: Request, res: Response) {
        try {
            const consulta =
                await this.service.atualizarConsulta(
                    Number(req.params.id),
                    req.body
                );

            return res.status(200).json(consulta);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async deletarConsulta(req: Request, res: Response) {
        try {
            const consulta =
                await this.service.deletarConsulta(
                    Number(req.params.id)
                );

            return res.status(200).json({
                mensagem: "Consulta deletada com sucesso!",
                data: consulta
            });
        } catch (error) {
            return res.status(404).json({ error });
        }
    }
}

export const consultaController =
    new ConsultaController(consultaService);