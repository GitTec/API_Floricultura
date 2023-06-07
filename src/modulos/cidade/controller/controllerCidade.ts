import { Request, Response } from "express"
import { conexao } from "../../../db/conexao"

class ControllerCidade {
    buscar(req: Request, res: Response) {
        conexao.query("SELECT id_Cidade as id, c.nome as nome, e.nome as estado, e.sigla as sigla_estado, e.id_Estado as id_estado FROM tbl_cidade c inner join tbl_estado e ON e.id_Estado = c.estado_id", function (erro, dados, campos) {
            if (erro)
                console.log(erro)
            return res.json(dados)
        })
    }

    encontrar(req: Request, res: Response) {
        const { id } = req.params
        conexao.query("SELECT id_Cidade as id, c.nome as nome, e.nome as estado, e.sigla as sigla_estado, e.id_Estado as id_estado FROM tbl_cidade c inner join tbl_estado e ON e.id_Estado = c.estado_id WHERE c.id_Cidade = ?",
            [id],
            function (erro, dados, campos) {
                if (erro)
                    console.log(erro)
                return res.json(dados)
            })
    }

    cadastrar(req: Request, res: Response) {
        const { nome, estado_id } = req.body
        conexao.query("INSERT INTO tbl_cidade (nome, estado_id) VALUES (?, ?)",
            [nome, estado_id],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(201).json({ status: "CIDADE CADASTRADA COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO CADASTRAR CIDADE" })
                }
            })
    }

    editar(req: Request, res: Response) {
        const { id } = req.params
        const { nome, estado_id } = req.body
        conexao.query("UPDATE tbl_cidade SET nome = ?, estado_id = ? WHERE id_Cidade = ?",
            [nome, estado_id, id],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(201).json({ status: "CIDADE EDITADA COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO EDITAR CIDADE" })
                }
            })
    }

    excluir(req: Request, res: Response) {
        const { id } = req.params
        conexao.query("DELETE FROM tbl_cidade WHERE id_Cidade = ?",
            [id],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(201).json({ status: "CIDADE EXCLUIDA COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO EXCLUIR CIDADE" })
                }
            })
    }
}

export { ControllerCidade }