/*
  Warnings:

  - You are about to drop the column `descricao` on the `exame` table. All the data in the column will be lost.
  - You are about to drop the column `pacienteId` on the `exame` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `exame` table. All the data in the column will be lost.
  - Added the required column `horario` to the `exame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `laboratorio` to the `exame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `exame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paciente_id` to the `exame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_documento` to the `exame` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exame" DROP CONSTRAINT "exame_pacienteId_fkey";

-- AlterTable
ALTER TABLE "exame" DROP COLUMN "descricao",
DROP COLUMN "pacienteId",
DROP COLUMN "valor",
ADD COLUMN     "horario" TEXT NOT NULL,
ADD COLUMN     "laboratorio" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "paciente_id" INTEGER NOT NULL,
ADD COLUMN     "url_documento" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "exame" ADD CONSTRAINT "exame_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
