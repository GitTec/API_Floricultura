import express from "express";
import dotenv from "dotenv"
import { rotasCategoria } from "./src/modulos/categoria/rotas/rotaCategoria";
import { rotasCidade } from "./src/modulos/cidade/rotas/rotaCidade";
import { rotasProduto } from "./src/modulos/produto/rotas/rotaProduto";
import { rotasUF } from "./src/modulos/uf/rotas/rotaUF";
import { rotasUsuario } from "./src/modulos/usuario/rotas/rotaUsuario"

dotenv.config()
const proj = express()
proj.use(express.json());

proj.get('/', (req, res) => {
    return res.send("<h1>SEJA BEM VINDO AO PROJETANDO SUA FLORICULTURA</h1>")
})
proj.use('/uf', rotasUF)
proj.use('/categoria', rotasCategoria)
proj.use('/produto', rotasProduto)
proj.use('/cidade', rotasCidade)
proj.use('/usuario', rotasUsuario)

proj.listen(process.env.PORTA, () => {
    console.log("Rodando na Porta 3333")
})


