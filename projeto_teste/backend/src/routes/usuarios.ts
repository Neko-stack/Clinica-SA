import { Router } from "express";
import { prisma } from "../prisma/prisma";
import type { Usuario } from "../prisma/generated/prisma/client";
import { createHash } from "../utils/createHash";
import { usuarioController } from "../controller/UsuarioController";

const usuariosRouter = Router()

usuariosRouter.get('/usuarios', async (req, res) => {
  
  return usuarioController.buscarTodos(req,res)
})

usuariosRouter.get('/usuarios/:id', async (req, res) => {
  
  return usuarioController.buscarPorId(req,res)
})

usuariosRouter.post("/usuarios", async (req, res) => {

  return usuarioController.criarUsuario(req,res)
})


usuariosRouter.put("/usuarios/:id", async (req, res) => {
  return usuarioController.atualizar(req,res)
  
})

usuariosRouter.delete('/usuarios/:id', async (req, res) => {


  return usuarioController.deletar(req,res)
})


export default usuariosRouter