import {Router} from 'express';
import { authController } from '../controller/AuthController';

const routerAuth = Router()

routerAuth.post("/cadastro", async (req, res) => {
 
  return authController.cadastrar(req,res)
})

routerAuth.post("/login", async (req, res) => {
  
  return authController.logar(req,res)

})
export default routerAuth