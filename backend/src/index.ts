import express from 'express';
import { auth } from './middleware/auth';
import cors from "cors"
import { authRoute } from './routes/authRoute';
import { usuarioRoute } from './routes/usuarioRoute';
import { pacienteRouter } from './routes/pacienteRoute';
import { exameRouter } from './routes/exameRoute';
import { consultaRouter } from './routes/consultaRoute';

const app = express();
app.use(express.json())

app.use(cors())
const port = 3000;

app.get('/', (req, res) => {
  console.log(req)
  res.send("Hello world")
})

app.use(authRoute)

app.use(auth)
// Endpoints usuario
app.use(usuarioRoute)
// Pacientes
app.use(pacienteRouter)
//Exames
app.use(exameRouter)
//Consulta
app.use(consultaRouter)



app.listen(port, () => {
  console.log("Servidor ta de pé :p")
})
