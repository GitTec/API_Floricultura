import express from "express"
import mysql from "mysql2"
import bcrypt from "bcryptjs"

const proj = express()
proj.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_flores'
});

proj.get('/', (req, res) => {
    return res.send("<h1>SEJA BEM VINDO AO PROJETANDO SUA FLORICULTURA</h1>")
})

proj.get('/categorias', (req, res) => {
    connection.query("SELECT * FROM tbl_categoria", function (erro, dados, campos) { //funcao anonima(S/N)
        if (erro)
            console.log(erro)
        return res.json(dados);
    })
})

proj.get('/categorias/:id', (req, res) => {
    /*
    Crio uma constante chamada idCat e atribuo o valor que vem de req, ou seja, valor enviado
    na requisição
    */

    const idCat = req.params.id

    connection.query(`SELECT * FROM tbl_categoria WHERE id_categoria = ?`,
        [idCat],
        function (erro, dados, campos) {
            if (erro)
                console.log(erro)
            return res.json(dados);
        })
})

proj.post('/categorias', (req, res) => {
    const dados = req.body

    connection.query(`INSERT INTO tbl_categoria (nome) values (?)`,
        [dados.nome],
        function (erro, dados, campos) {
            if (!erro) {
                return res.status(201).json({ status: "sucesso" })
            } else {
                return res.status(500).json({ status: "falha" })
            }
        })
})

proj.put('/categorias/:id', (req, res) => {
    const id = req.params.id
    const dado = req.body
    connection.query('UPDATE tbl_categoria SET nome = ? WHERE id_categoria = ?',
        [dado.nome, id],
        function (erro, dados, campos) {
            if (!erro)
                return res.json({ status: 'CATEGORIA EDITADA COM SUCESSO' })
            else
                return res.json({ status: 'ERRO AO EDITAR CATEGORIA' })
        })
})

proj.delete('/categorias/:id', (req, res) => {
    const ID = req.params.id

    connection.query(`DELETE FROM tbl_categoria WHERE id_categoria = ?`,
        [ID],
        function (erro, dados, campos) {
            if (!erro) {
                return res.status(200).json({ status: "EXCLUÍDO COM SUCESSO" })
            } else {
                return res.status(500).json({ status: "FALHA AO EXCLUIR" })
            }
        })
})

proj.get('/uf', (req, res) => {
    connection.query("SELECT * from tbl_estado", function (erro, dados, campos) {
        if (erro)
            console.log(erro)
        return res.json(dados)
    })
})

proj.get('/uf/:id', (req, res) => {
    const id_UF = req.params.id
    connection.query('SELECT * FROM tbl_estado WHERE id_Estado = ?',
        [id_UF],
        function (erro, dados, campos) {
            if (erro)
                console.log(erro)
            return res.json(dados)
        })
})

proj.post('/uf', (req, res) => {
    /*
    REQUEST.BODY -> PEGAR DADOS QUE VEM NO CORPO
    RESQUEST.PARAMS -> PEGAR DADOS QUE VEM NA URL QUANDO EU DEFINO COM : E O NOME
    REQUEST.QUERY -> PARA PEGAR DADOS ENVIADOS NA URL DEPOIS DE UMA INTERROGAÇÃO
    */
    const dado = req.body
    connection.query("INSERT INTO tbl_estado (nome, sigla) values(?, ?)",
        [dado.nome, dado.sigla], function (erro, dados, campos) {
            if (!erro)
                return res.json({ status: 'UF CADASTRADA COM SUCESSO' })
            else
                return res.json({ status: 'ERRO AO CADASTRAR UF' })
        })
})

proj.put('/uf/:id', (req, res) => {
    const id = req.params.id
    const dado = req.body
    connection.query('UPDATE tbl_estado SET nome = ?, sigla = ? WHERE id_Estado = ?',
        [dado.nome, dado.sigla, id],
        function (erro, dados, campo) {
            if (!erro)
                return res.json({ status: 'UF EDITADA COM SUCESSO' })
            else
                return res.json({ status: 'ERRO AO EDITAR UF' })
        })
})

proj.delete('/uf/:id', (req, res) => {
    const ID_UF = req.params.id
    connection.query("DELETE FROM tbl_estado WHERE id_Estado = ?",
        [ID_UF], function (erro, dados, campos) {
            if (!erro)
                return res.json({ status: 'UF DELETADA COM SUCESSO' })
            else {
                console.log(erro)
                return res.json({ status: 'ERRO AO DELETAR UF' })
            }
        })
})

proj.get('/produtos', (req, res) => {
    connection.query("SELECT * FROM tbl_produtos", function (erro, dados, campo) {
        if (erro)
            console.log(erro)
        return res.json(dados)
    })
})

proj.get('/produtos/:id', (req, res) => {
    const idProd = req.params.id

    connection.query('SELECT * FROM tbl_produtos WHERE id_produtos = ?',
        [idProd],
        function (erro, dados, campo) {
            if (erro)
                console.log(erro)
            return res.json(dados);
        })
})

proj.post('/produtos', (req, res) => {
    const desc = req.body

    connection.query('INSERT INTO tbl_produtos (nome_produto, preco, qtd_estoque, categoria_id) values (?, ?, ?, ?)',
        [desc.nome_produto, desc.preco, desc.qtd_estoque, desc.categoria_id],
        function (erro, dados, campo) {
            if (!erro) {
                return res.status(201).json({ status: "SUCESSO" })
            } else {
                return res.status(500).json({ status: "FALHA" })
            }
        })
})

proj.put('/produtos/:id', (req, res) => {
    const id = req.params.id
    const dado = req.body
    connection.query('UPDATE tbl_produtos SET nome_produto = ?, preco = ?, qtd_estoque = ?, categoria_id = ? WHERE id_Produtos = ?',
        [dado.nome_produto, dado.preco, dado.qtd_estoque, dado.categoria_id, id],
        function (erro, dados, campos) {
            if (!erro)
                return res.json({ status: 'PRODUTO EDITADO COM SUCESSO' })
            else
                console.log(erro)
            return res.json({ status: 'ERRO AO EDITAR PRODUTO' })
        })
})

proj.delete('/produtos/:id', (req, res) => {
    const ID = req.params.id
    connection.query('DELETE FROM tbl_produtos WHERE id_produtos = ?',
        [ID],
        function (erro, dados, campos) {
            if (!erro) {
                return res.status(200).json({ status: "EXCLUÍDO COM SUCESSO" })
            } else {
                return res.status(500).json({ status: "ERRO AO EXCLUIR" })
            }
        })
})

proj.get('/usuarios', (req, res) => {
    connection.query("SELECT * FROM tbl_usuario", function (erro, dados, campos) {
        if (erro)
            console.log(erro)
        return res.json(dados)
    })
})

proj.get('/usuarios/:id', (req, res) => {
    const ID_User = req.params.id
    connection.query('SELECT * FROM tbl_usuario WHERE id_usuario = ?',
        [ID_User], function (erro, dados, campos) {
            if (erro)
                console.log(erro)
            return res.json(dados)
        })
})

proj.post('/usuarios', async (req, res) => {
    const dado = req.body
    const senhaCriptografada = await bcrypt.hash(dado.senha, 8)
    connection.query("INSERT INTO tbl_usuario (nome, login, senha, email) values (?, ?, ?, ?)",
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
    connection.query('UPDATE tbl_usuario SET nome = ?, login = ?, senha = ?, email = ? WHERE id_usuario = ?',
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
    connection.query('DELETE FROM tbl_usuario WHERE id_usuario = ?',
        [ID_User], function (erro, dados, campos) {
            if (!erro) {
                res.status(200).json({ status: "EXCLUIDO COM SUCESSO" })
            } else {
                console.log(erro)
                res.status(500).json({ status: "ERRO AO EXCLUIR USUARIO" })
            }
        })
})
proj.get('/cidades', (req, res) => {
    connection.query("SELECT * FROM tbl_cidade", function (erro, dados, campos) {
        if (erro)
            console.log(erro)
        return res.json(dados)
    })
})

proj.get('/cidades/:id', (req, res) => {
    const idEst = req.params.id
    connection.query("SELECT * FROM tbl_cidade WHERE id_Cidade = ?",
        [idEst],
        function (erro, dados, campo) {
            if (erro)
                console.log(erro)
            return res.json(dados)
        })
})

proj.post('/cidades', (req, res) => {
    const cid = req.body
    connection.query("INSERT INTO tbl_cidade (nome, estado_id) VALUES (?, ?)",
        [cid.nome, cid.estado_id],
        function (erro, dados, campos) {
            if (!erro) {
                return res.status(201).json({ status: "SUCESSO" })
            } else {
                return res.status(500).json({ status: "FALHA" })
            }
        })
})

proj.put('/cidades/:id', (req, res) => {
    const id = req.params.id
    const dado = req.body
    connection.query('UPDATE tbl_cidade SET nome = ?, estado_id = ? WHERE id_Cidade = ?',
        [dado.nome, dado.estado_id, id],
        function (erro, dados, campos) {
            if (!erro)
                return res.json({ status: 'CIDADE EDITADA COM SUCESSO' })
            else
                console.log(erro)
            return res.json({ status: 'ERRO AO EDITAR CIDADE' })
        })
})

proj.delete('/cidades/:id', (req, res) => {
    const ID = req.params.id
    connection.query('DELETE FROM tbl_cidade WHERE id_Cidade = ?',
        [ID], function (erro, dados, campos) {
            if (!erro) {
                return res.status(200).json({ status: "eEXCLUÍDO COM SUCESSO" })
            } else {
                return res.status(500).json({ status: "ERRO AO EXCLUIR" })
            }
        })
})

proj.listen(3333, () => {
    console.log("Rodando na Porta 3333")
})


