import { Router } from "express"
import { ControllerProduto } from "../controller/controllerProduto"

const rotasProduto = Router()
const controller = new ControllerProduto()

rotasProduto.get('/', controller.buscar)
rotasProduto.get('/:id', controller.encontrar)
rotasProduto.post('/', controller.cadastrar)
rotasProduto.put('/:id', controller.editar)
rotasProduto.delete('/:id', controller.excluir)

export { rotasProduto }