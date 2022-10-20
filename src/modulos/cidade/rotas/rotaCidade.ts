import { Router } from "express"
import { ControllerCidade } from "../controller/controllerCidade"

const rotasCidade = Router()
const controller = new ControllerCidade()

rotasCidade.get('/', controller.buscar)
rotasCidade.get('/:id', controller.encontrar)
rotasCidade.post('/', controller.cadastrar)
rotasCidade.put('/:id', controller.editar)
rotasCidade.delete('/:id', controller.excluir)

export { rotasCidade }

