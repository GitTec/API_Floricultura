import { Request, Response } from "express"
import { conexao } from "../../../db/conexao"

class ControllerUF {
    buscar(req: Request, res: Response) {
        conexao.query("SELECT * from tbl_estado", function (erro, dados, campos) {
            if (erro) {
                console.log(erro)
                return res.status(500).json({ status: "ERRO AO BUSCAR CLIENTES" })
            } else {
                return res.status(200).json(dados)
            }
        })
    }

    encontrar(req: Request, res: Response) {
        const { id } = req.params
        conexao.query("SELECT * FROM tbl_estado WHERE id_Estado = ?",
            [id], function (erro, dados, campos) {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO BUSCAR CLIENTE" })
                } else {
                    return res.status(200).json(dados)
                }
            })
    }

    cadastrar(req: Request, res: Response) {
        const { nome, sigla } = req.body
        conexao.query("INSERT INTO tbl_estado (nome, sigla) VALUES(?, ?)",
            [nome, sigla], function (erro, dados, campos) {
                if (!erro) {
                    return res.status(201).json({ status: "UF CADASTRADA COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO CADASTRAR UF" })
                }
            })
    }

    editar(req: Request, res: Response) {
        const { id } = req.params
        const { nome, sigla } = req.body
        conexao.query('UPDATE tbl_estado SET nome = ?, sigla = ? WHERE id_Estado = ?',
            [nome, sigla, id], function (erro, dados, campo) {
                if (!erro) {
                    return res.status(200).json({ status: "UF EDITADA COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO EDITAR UF" })
                }
            })
    }

    excluir(req: Request, res: Response) {
        const { id } = req.params
        conexao.query("DELETE FROM tbl_estado WHERE id_Estado = ?",
            [id], function (erro, dados, campos) {
                if (!erro) {
                    return res.status(200).json({ status: "UF EXCLUÍDA COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO EXCLUIR UF" })
                }
            })
    }
}

export { ControllerUF }