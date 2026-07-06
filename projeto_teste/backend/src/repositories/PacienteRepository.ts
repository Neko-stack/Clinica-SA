import type { Paciente, PrismaClient } from "../prisma/generated/prisma";
import { prisma } from "../prisma/prisma";

export class PacienteRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async listarTodosPacientes() {
        return await this.prisma.paciente.findMany();
    }

    async buscarPacienteId(idPaciente: number) {
        return await this.prisma.paciente.findUnique({
            where: { id: idPaciente }
        });
    }

    async criarPaciente(dadosPaciente: Partial<Paciente>) {
        return await this.prisma.paciente.create({
            data: {
                nome: dadosPaciente.nome || "",
                cpf: dadosPaciente.cpf || "",
                telefone: dadosPaciente.telefone || "",
                email: dadosPaciente.email || "",
                data_nascimento: new Date(dadosPaciente.data_nascimento || ""),
                sexo: dadosPaciente.sexo || "",
                convenio: dadosPaciente.convenio ?? null,
                alergias: dadosPaciente.alergias ?? null,
                observacoes: dadosPaciente.observacoes ?? null,
                responsavel: dadosPaciente.responsavel ?? null
            }
        });
    }

    async atualizarPaciente(
        idPaciente: number,
        dadosPaciente: Omit<Paciente, "id">
    ) {
        return await this.prisma.paciente.update({
            where: { id: idPaciente },
            data: {
                ...dadosPaciente,
                data_nascimento: new Date(dadosPaciente.data_nascimento)
            }
        });
    }

    async deletarPaciente(idPaciente: number) {
        return await this.prisma.paciente.delete({
            where: { id: idPaciente }
        });
    }
}

export const pacienteRepository = new PacienteRepository(prisma);
