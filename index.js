import express from "express"
import mysql from "mysql2"

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

app.get('/categorias', (req, res) => {
    connection.query("SELECT * FROM tbl_categoria", function (erro, dados, campos) { //funcao anonima(S/N)
        if (erro)
            console.log(erro)
        return res.json(dados);
    })
})

app.get('/categorias/:id', (req, res) => {
/*
Crio uma constantechamada idCat e atribuo o valor que vem de req, ou seja, valor enviado
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

app.post('/categorias', (req, res) => {
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

app.delete('/categorias/:id', (req, res) => {
    const ID = req.params.id

    connection.query(`DELETE FROM tbl_categoria WHERE id_categoria = ?`,
        [ID],
        function (erro, dados, campos) {
            if (!erro) {
                return res.status(200).json({ status: "excluido com sucesso" })
            } else {
                return res.status(500).json({ status: "falha ao excluir" })
            }
        })
})

app.get('/uf', (req, res) => {
    connection.query("SELECT * from tbl_estado", function (erro, dados, campos) {
        if (erro)
            console.log(erro)
        return res.json(dados)
    })
})

app.post('/uf', (req, res) => {
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

app.delete('/uf/:id', (req, res) => {
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
                return res.status(201).json({ status: "sucesso" })
            } else {
                return res.status(500).json({ status: "falha" })
            }
        })
})


proj.delete('/produtos/:id', (req, res) => {
    const ID = req.params.id

    connection.query('DELETE FROM tbl_produtos WHERE id_produtos = ?',
        [ID],
        function (erro, dados, campos) {
            if (!erro) {
                return res.status(201).json({ status: "excluido com sucesso" })
            } else {
                return res.status(500).json({ status: "erro ao excluir" })
            }
        })
})

proj.listen(3333, () => {
    console.log("Rodando na Porta 3333")
})


