import { Router } from "express"
import { ControllerProduto } from "../controller/controllerProduto"
import { autenticar } from "../../usuario/middleware/autenticacao"

const rotasProduto = Router()
const controller = new ControllerProduto()

rotasProduto.get('/',autenticar, controller.buscar)
rotasProduto.get('/:id',autenticar, controller.encontrar)
rotasProduto.post('/', autenticar, controller.cadastrar)
rotasProduto.put('/:id', autenticar, controller.editar)
rotasProduto.delete('/:id', autenticar,controller.excluir)

export { rotasProduto }