import type { Prontuario } from "../prisma/generated/prisma";
import {
    prontuarioRepository,
    ProntuarioRepository
} from "../repositories/ProntuarioRepository";

export class ProntuarioService {
    constructor(
        private readonly repository: ProntuarioRepository
    ) {}

    async listarTodosProntuarios() {
        return await this.repository.listarTodosProntuarios();
    }

    async buscarProntuarioId(idProntuario: number) {
        return await this.repository.buscarProntuarioId(
            idProntuario
        );
    }

    async criarProntuario(
        dadosProntuario: Prontuario
    ) {
        return await this.repository.criarProntuario(
            dadosProntuario
        );
    }

    async atualizarProntuario(
        idProntuario: number,
        dadosProntuario: Omit<Prontuario, "id">
    ) {
        return await this.repository.atualizarProntuario(
            idProntuario,
            dadosProntuario
        );
    }

    async deletarProntuario(idProntuario: number) {
        return await this.repository.deletarProntuario(
            idProntuario
        );
    }
}

export const prontuarioService =
    new ProntuarioService(prontuarioRepository);