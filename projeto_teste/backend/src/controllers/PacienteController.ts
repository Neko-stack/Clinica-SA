import type { Request, Response } from "express";
import type { Paciente } from "../prisma/generated/prisma";
import {
    pacienteService,
    PacienteService
} from "../services/PacienteService";

class PacienteController {
    constructor(
        private readonly service: PacienteService
    ) {}

    async listarTodosPacientes(
        req: Request,
        res: Response
    ) {
        try {
            const pacientes =
                await this.service.listarTodosPacientes();

            return res.status(200).json(pacientes);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async buscarPacienteId(
        req: Request,
        res: Response
    ) {
        try {
            const paciente =
                await this.service.buscarPacienteId(
                    Number(req.params.id)
                );

            return res.status(200).json(paciente);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async criarPaciente(
        req: Request,
        res: Response
    ) {
        try {
            const paciente =
                await this.service.criarPaciente(
                    req.body as Paciente
                );

            return res.status(201).json(paciente);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async atualizarPaciente(
        req: Request,
        res: Response
    ) {
        try {
            const paciente =
                await this.service.atualizarPaciente(
                    Number(req.params.id),
                    req.body
                );

            return res.status(200).json(paciente);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }

    async deletarPaciente(
        req: Request,
        res: Response
    ) {
        try {
            const paciente =
                await this.service.deletarPaciente(
                    Number(req.params.id)
                );

            return res.status(200).json({
                mensagem: "Paciente deletado com sucesso",
                data: paciente
            });
        } catch (error) {
            return res.status(404).json({ error });
        }
    }
}

export const pacienteController =
    new PacienteController(pacienteService);