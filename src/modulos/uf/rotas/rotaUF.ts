import { Router } from "express"
import { ControllerUF } from "../controller/controllerUF"
import { autenticar } from "../../usuario/middleware/autenticacao"

const rotasUF = Router()
const controller = new ControllerUF()

rotasUF.get('/',autenticar, controller.buscar)
rotasUF.get('/:id',autenticar, controller.encontrar)
rotasUF.post('/',autenticar, controller.cadastrar)
rotasUF.put('/:id',autenticar, controller.editar)
rotasUF.delete('/:id',autenticar, controller.excluir)

export { rotasUF }