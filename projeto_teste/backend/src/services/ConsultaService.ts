import type { Consulta } from "../prisma/generated/prisma";
import {
    consultaRepository,
    ConsultaRepository
} from "../repositories/ConsultaRepository";

export class ConsultaService {
    constructor(
        private readonly repository: ConsultaRepository
    ) {}

    async listarTodasConsultas(pagina?: number, limite?: number) {
        return await this.repository.listarTodasConsultas(
            pagina,
            limite
        );
    }

    async buscarConsultaId(idConsulta: number) {
        return await this.repository.buscarConsultaId(idConsulta);
    }

    async criarConsulta(dadosConsulta: Consulta) {
        return await this.repository.criarConsulta(dadosConsulta);
    }

    async atualizarConsulta(
        idConsulta: number,
        dadosConsulta: Omit<Consulta, "id">
    ) {
        return await this.repository.atualizarConsulta(
            idConsulta,
            dadosConsulta
        );
    }

    async deletarConsulta(idConsulta: number) {
        return await this.repository.deletarConsulta(idConsulta);
    }
}

export const consultaService = new ConsultaService(
    consultaRepository
);