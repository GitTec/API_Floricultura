import { Router } from "express"
import { ControllerUF } from "../controller/controllerUF"

const rotasUF = Router()
const controller = new ControllerUF()

rotasUF.get('/', controller.buscar)
rotasUF.get('/:id', controller.encontrar)
rotasUF.post('/', controller.cadastrar)
rotasUF.put('/:id', controller.editar)
rotasUF.delete('/:id', controller.excluir)

export { rotasUF }