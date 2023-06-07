import { Router } from "express"
import { ControllerUsuario } from "../controller/controllerUsuario"
import { autenticar } from "../middleware/autenticacao"

const rotasUsuario = Router()
const controller = new ControllerUsuario()

rotasUsuario.get('/',autenticar, controller.buscar)
rotasUsuario.get('/:id',autenticar, controller.encontrar)
rotasUsuario.post('/',autenticar, controller.cadastrar)
rotasUsuario.post('/login', controller.login)
rotasUsuario.put('/:id',autenticar, controller.editar)
rotasUsuario.delete('/:id',autenticar, controller.excluir)

export { rotasUsuario }