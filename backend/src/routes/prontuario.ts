import { Router } from "express";
import {  prontuarioController } from "../controller/ProntuarioController";
import { roleMiddleware } from "../middleware/role";
import { Role } from "../prisma/generated/prisma/enums";

const prontuarioRouter = Router()

prontuarioRouter.use(roleMiddleware([Role.ADMIN]))

prontuarioRouter.get('/prontuario', async (req, res) => {
  
  return prontuarioController.buscarTodos(req,res)
})

prontuarioRouter.get('/prontuario/:id', async (req, res) => {


  return prontuarioController.buscarPorId(req,res)
})

prontuarioRouter.post("/prontuario", async (req, res) => {
 
  return prontuarioController.criar(req,res)   
})

prontuarioRouter.put("/prontuario/:id", async (req, res) => {


  return prontuarioController.atualizar(req,res)
})

prontuarioRouter.delete('/prontuario/:id', async (req, res) => {

  return prontuarioController.deletar(req,res)
})

export default prontuarioRouter