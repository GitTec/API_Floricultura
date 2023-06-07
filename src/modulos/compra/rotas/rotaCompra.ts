import { Router } from "express"
import { ControllerCompra } from "../controller/controllerCompra"
import { validarCadastro, validarExclusao, validarEdicao } from "../middleware/validacao"
import { autenticar } from "../../usuario/middleware/autenticacao"



const rotasCompra = Router()
const controller = new ControllerCompra()

rotasCompra.get('/', autenticar, controller.buscar)
rotasCompra.get('/:id', autenticar, controller.encontrar)
rotasCompra.post('/', validarCadastro, controller.cadastrar)
rotasCompra.put('/:id', validarEdicao, controller.editar)
rotasCompra.delete('/:id', validarExclusao, controller.excluir)

export { rotasCompra }