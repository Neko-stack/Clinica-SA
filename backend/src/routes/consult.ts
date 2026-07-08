import { Router } from "express";
import { consultController } from "../controller/ConsultController";
import { roleMiddleware } from "../middleware/role";
import { Role } from "../prisma/generated/prisma/enums";

const consultRouter = Router()

consultRouter.use(roleMiddleware([Role.ADMIN]))

consultRouter.get('/consulta', async (req, res) => {
  
  return consultController.buscarTodos(req,res)
})

consultRouter.get('/consulta/:id', async (req, res) => {


  return consultController.buscarPorId(req,res)
})

consultRouter.post("/consulta", async (req, res) => {
 
  return consultController.criar(req,res)
})

consultRouter.put("/consulta/:id", async (req, res) => {


  return consultController.atualizar(req,res)
})

consultRouter.delete('/consulta/:id', async (req, res) => {

  return consultController.deletar(req,res)
})

export default consultRouter