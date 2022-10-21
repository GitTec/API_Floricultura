import { Router } from "express"
import { ControllerUsuario } from "../controller/controllerUsuario"

const rotasUsuario = Router()
const controller = new ControllerUsuario()

rotasUsuario.get('/', controller.buscar)
rotasUsuario.get('/:id', controller.encontrar)
rotasUsuario.post('/', controller.cadastrar)
rotasUsuario.put('/:id', controller.editar)
rotasUsuario.delete('/:id', controller.excluir)

export { rotasUsuario }