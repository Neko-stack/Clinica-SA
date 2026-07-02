import type { PrismaClient, Prontuario } from "../prisma/generated/prisma";
import { prisma } from "../prisma/prisma";

export class ProntuarioRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async listarTodosProntuarios() {
        return await this.prisma.prontuario.findMany();
    }

    async buscarProntuarioId(idProntuario: number) {
        return await this.prisma.prontuario.findUnique({
            where: {
                id: idProntuario
            }
        });
    }

    async criarProntuario(
        dadosProntuario: Partial<Prontuario>
    ) {
        return await this.prisma.prontuario.create({
            data: {
                descricao: dadosProntuario.descricao || "",
                data: new Date(dadosProntuario.data || ""),
                medico_responsavel_id:
                    dadosProntuario.medico_responsavel_id || 0,
                paciente_id:
                    dadosProntuario.paciente_id || 0
            }
        });
    }

 async atualizarProntuario(
    idProntuario: number,
    dadosProntuario: Omit<Prontuario, "id">
) {
    return await this.prisma.prontuario.update({
        where: {
            id: idProntuario
        },
        data: {
            ...dadosProntuario,
            data: dadosProntuario.data
                ? new Date(dadosProntuario.data)
                : null
        }
    });
}

    async deletarProntuario(idProntuario: number) {
        return await this.prisma.prontuario.delete({
            where: {
                id: idProntuario
            }
        });
    }
}

export const prontuarioRepository =
    new ProntuarioRepository(prisma);