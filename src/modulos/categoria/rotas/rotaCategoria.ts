import { Router } from "express";
import { ControllerCategoria } from "../controller/controllerCategoria";
import { autenticar } from "../../usuario/middleware/autenticacao";

const rotasCategoria = Router();
const controller = new ControllerCategoria();

rotasCategoria.get('/',autenticar, controller.buscar);
rotasCategoria.get('/:id',autenticar, controller.encontrar);
rotasCategoria.post('/',autenticar, controller.cadastrar); 
rotasCategoria.put('/:id',autenticar, controller.editar); 
rotasCategoria.delete('/:id',autenticar, controller.excluir); 

export { rotasCategoria };