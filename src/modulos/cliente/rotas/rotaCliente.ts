import { Router } from "express"
import { ControllerCliente } from "../controller/controllerCliente"

const rotasCliente = Router()
const controller = new ControllerCliente()

rotasCliente.get('/', controller.buscar)
rotasCliente.get('/:id', controller.encontrar)
rotasCliente.post('/', controller.cadastrar)
rotasCliente.put('/:id', controller.editar)
rotasCliente.delete('/:id', controller.excluir)

export { rotasCliente }