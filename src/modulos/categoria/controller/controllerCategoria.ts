import { Request, Response } from "express"
import { conexao } from "../../../db/conexao"

class ControllerCategoria {
    buscar(req: Request, res: Response) {
        conexao.query("SELECT * FROM tbl_categoria", function (erro, dados, campos) {
            if (erro)
                console.log(erro)
            return res.json(dados);
        })
    }

    encontrar(req: Request, res: Response) {
        const { id } = req.params
        conexao.query(`SELECT * FROM tbl_categoria WHERE id_categoria = ?`,
            [id],
            function (erro, dados, campos) {
                if (erro)
                    console.log(erro)
                return res.json(dados);
            })
    }

    cadastrar(req: Request, res: Response) {
        const { nome } = req.body
        conexao.query(`INSERT INTO tbl_categoria (nome) values (?)`,
            [nome],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(201).json({ status: "CATEGORIA CADASTRADA COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO CADASTRAR CATEGORIA" })
                }
            })
    }

    editar(req: Request, res: Response) {
        const { id } = req.params
        const { nome } = req.body
        conexao.query('UPDATE tbl_categoria SET nome = ? WHERE id_categoria = ?',
            [nome, id],
            function (erro, dados, campos) {
                if (!erro)
                    return res.status(201).json({ status: 'CATEGORIA EDITADA COM SUCESSO' })
                else {
                    console.log(erro)
                    return res.status(500).json({ status: 'ERRO AO EDITAR CATEGORIA' })
                }
            })
    }

    excluir(req: Request, res: Response) {
        const { id } = req.params
        conexao.query(`DELETE FROM tbl_categoria WHERE id_categoria = ?`,
            [id],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(201).json({ status: "CATEGORIA EXCLUÍDA COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO EXCLUIR CATEGORIA" })
                }
            })
    }
}

export { ControllerCategoria }