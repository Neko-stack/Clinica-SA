import { Router } from "express";
import { pacienteController } from "../controller/PacienteController";


const pacienteRouter = Router()


pacienteRouter.get('/paciente', async (req, res) => {
  
  return pacienteController.buscarTodos(req,res)
})

pacienteRouter.get('/paciente/:id', async (req, res) => {


  return pacienteController.buscarPorId(req,res)
})

pacienteRouter.post("/paciente", async (req, res) => {
 
  return pacienteController.criar(req,res)
})

pacienteRouter.put("/paciente/:id", async (req, res) => {


  return pacienteController.atualizar(req,res)
})

pacienteRouter.delete('/paciente/:id', async (req, res) => {

  return pacienteController.deletar(req,res)
})

export default pacienteRouter