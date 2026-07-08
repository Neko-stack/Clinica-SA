-- CreateTable
CREATE TABLE "medicamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicamento_pkey" PRIMARY KEY ("id")
);
