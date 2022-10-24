import { Request, Response, Router, NextFunction } from "express"
import { ControllerCidade } from "../controller/controllerCidade"
import { validarCadastro, validarExclusao } from "../middleware/validacao"
import { autenticar } from "../../usuario/middleware/autenticacao"

const rotasCidade = Router()
const controller = new ControllerCidade()


rotasCidade.get('/', autenticar, controller.buscar)
rotasCidade.get('/:id', autenticar, controller.encontrar)
rotasCidade.post('/', validarCadastro, controller.cadastrar)
rotasCidade.put('/:id', controller.editar)
rotasCidade.delete('/:id', validarExclusao, controller.excluir)

export { rotasCidade }

