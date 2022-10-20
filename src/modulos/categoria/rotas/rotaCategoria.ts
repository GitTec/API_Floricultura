import { Router } from "express";
import { ControllerCategoria } from "../controller/controllerCategoria";

const rotasCategoria = Router();
const controller = new ControllerCategoria();

rotasCategoria.get('/', controller.buscar);
rotasCategoria.get('/:id', controller.encontrar);
rotasCategoria.post('/', controller.cadastrar); 
rotasCategoria.put('/:id', controller.editar); 
rotasCategoria.delete('/:id', controller.excluir); 

export { rotasCategoria };