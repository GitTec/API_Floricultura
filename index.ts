import express from "express";
import { rotasCategoria } from "./src/modulos/categoria/rotas/rotaCategoria";
import { rotasCidade } from "./src/modulos/cidade/rotas/rotaCidade";
import { rotasProduto } from "./src/modulos/produto/rotas/rotaProduto";
import { rotasUF } from "./src/modulos/uf/rotas/rotaUF";

const proj = express()
proj.use(express.json());

proj.get('/', (req, res) => {
    return res.send("<h1>SEJA BEM VINDO AO PROJETANDO SUA FLORICULTURA</h1>")
})
proj.use('/uf', rotasUF)
proj.use('/categoria', rotasCategoria)
proj.use('/produto', rotasProduto)
proj.use('/cidade', rotasCidade)

/*
proj.get('/usuarios', (req, res) => {
    conexao.query("SELECT nome, login, email, id_usuario FROM tbl_usuario", function (erro, dados, campos) {
        if (erro)
            console.log(erro)
        return res.json(dados)
    })
})

proj.get('/usuarios/:id', (req: Request, res: Response) => {
    const { id } = req.params
    conexao.query('SELECT nome, login, email, id_usuario FROM tbl_usuario WHERE id_usuario = ?',
        [id], function (erro, dados, campos) {
            if (erro)
                console.log(erro)
            return res.json(dados)
        })
})

proj.post('/usuarios', async (req, res) => {
    const dado = req.body
    const senhaCriptografada = await bcrypt.hash(dado.senha, 8)
    conexao.query("INSERT INTO tbl_usuario (nome, login, senha, email) values (?, ?, ?, ?)",
        [dado.nome, dado.login, senhaCriptografada, dado.email],
        function (erro, dados, campos) {
            if (!erro)
                return res.json({ status: 'USUARIO CADASTRADO COM SUCESSO' })
            else {
                console.log(erro)
                return res.json({ status: 'ERRO AO CADASTRAR USUARIO' })
            }

        })
})

proj.put('/usuarios/:id', async (req, res) => {
    const ID_User = req.params.id
    const dado = req.body
    const senhaCriptografada = await bcrypt.hash(dado.senha, 8)
    conexao.query('UPDATE tbl_usuario SET nome = ?, login = ?, senha = ?, email = ? WHERE id_usuario = ?',
        [dado.nome, dado.login, senhaCriptografada, dado.email, ID_User],
        function (erro, dados, campos) {
            if (!erro)
                return res.json({ status: "USUARIO EDITADO COM SUCESSO" })
            else {
                console.log(erro)
                return res.json({ status: "ERRO AO EDITAR USUARIO" })
            }

        })
})

proj.delete('/usuarios/:id', (req, res) => {
    const ID_User = req.params.id
    conexao.query('DELETE FROM tbl_usuario WHERE id_usuario = ?',
        [ID_User], function (erro, dados, campos) {
            if (!erro) {
                res.status(200).json({ status: "EXCLUIDO COM SUCESSO" })
            } else {
                console.log(erro)
                res.status(500).json({ status: "ERRO AO EXCLUIR USUARIO" })
            }
        })
})
*/

proj.listen(3333, () => {
    console.log("Rodando na Porta 3333")
})


