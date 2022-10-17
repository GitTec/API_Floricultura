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


