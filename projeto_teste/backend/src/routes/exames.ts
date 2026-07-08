import { Router } from "express";
import { exameController } from "../controller/ExameController";
import { roleMiddleware } from "../middleware/role";
import { Role } from "../prisma/generated/prisma/enums";

const examesRouter = Router()

// examesRouter.use(roleMiddleware([Role.ADMIN]))

examesRouter.get('/exames', async (req, res) => {
  
  return exameController.buscarTodos(req,res)
})

examesRouter.get('/exames/:id', async (req, res) => {


  return exameController.buscarPorId(req,res)
})

examesRouter.post("/exames", async (req, res) => {
 
  return exameController.criarExame(req,res)
})

examesRouter.put("/exames/:id", async (req, res) => {


  return exameController.atualizar(req,res)
})

examesRouter.delete('/exames/:id', async (req, res) => {

  return exameController.deletar(req,res)
})

export default examesRouter