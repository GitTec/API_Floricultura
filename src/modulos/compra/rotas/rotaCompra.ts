import { Router } from "express"
import { ControllerCompra } from "../controller/controllerCompra"

const rotasCompra = Router()
const controller = new ControllerCompra()

rotasCompra.get('/', controller.buscar)
rotasCompra.get('/:id', controller.encontrar)
rotasCompra.post('/', controller.cadastrar)
rotasCompra.put('/:id', controller.editar)
rotasCompra.delete('/:id', controller.excluir)

export { rotasCompra }