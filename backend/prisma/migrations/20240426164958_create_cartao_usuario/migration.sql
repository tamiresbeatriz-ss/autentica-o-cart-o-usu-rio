-- CreateTable
CREATE TABLE "Cartao" (
    "numero" TEXT NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "validade" TEXT NOT NULL,
    "digitoSeguranca" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cartao_pkey" PRIMARY KEY ("numero")
);

-- AddForeignKey
ALTER TABLE "Cartao" ADD CONSTRAINT "Cartao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
