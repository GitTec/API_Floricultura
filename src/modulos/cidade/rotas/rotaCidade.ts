import { Router } from "express"
import { ControllerCidade } from "../controller/controllerCidade"
import { autenticar } from "../../usuario/middleware/autenticacao"

const rotasCidade = Router()
const controller = new ControllerCidade()

rotasCidade.get('/',autenticar, controller.buscar)
rotasCidade.get('/:id',autenticar, controller.encontrar)
rotasCidade.post('/',autenticar, controller.cadastrar)
rotasCidade.put('/:id',autenticar, controller.editar)
rotasCidade.delete('/:id',autenticar, controller.excluir)

export { rotasCidade }

