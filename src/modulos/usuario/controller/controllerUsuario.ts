import { Request, Response } from "express"
import { conexao } from "../../../db/conexao"
import {hash} from "bcryptjs"

class ControllerUsuario {
    buscar(req: Request, res: Response) {
        conexao.query("SELECT nome, login, email, id_usuario FROM tbl_usuario",
            function (erro, dados, campos) {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO BUSCAR USUARIOS" })
                } else {
                    return res.status(200).json(dados)
                }
            })
    }

    encontrar(req: Request, res: Response) {
        const { id } = req.params
        conexao.query('SELECT nome, login, email, id_usuario FROM tbl_usuario WHERE id_usuario = ?',
            [id], function (erro, dados, campos) {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO BUSCAR USUARIO" })
                } else {
                    return res.status(200).json(dados)
                }
            })
    }

    async cadastrar(req: Request, res: Response) {
        const {nome, login, senha, email} = req.body
        const senhaCriptografada = await hash(senha, 8)
        conexao.query("INSERT INTO tbl_usuario (nome, login, senha, email) values (?, ?, ?, ?)",
            [nome, login, senhaCriptografada, email],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(201).json({ status: "USUARIO CADASTRADO COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO CADASTRAR USUARIO" })
                }

            })
    }

    async editar(req: Request, res: Response) {
        const { id } = req.params
        const { nome, login, senha, email } = req.body
        const senhaCriptografada = await hash(senha, 8)
        conexao.query('UPDATE tbl_usuario SET nome = ?, login = ?, senha = ?, email = ? WHERE id_usuario = ?',
            [nome, login, senhaCriptografada, email, id],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(200).json({ status: "USUARIO EDITADO COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO EDITAR USUARIO" })
                }

            })
    }

    excluir(req: Request, res: Response) {
        const { id } = req.params
        conexao.query('DELETE FROM tbl_usuario WHERE id_usuario = ?',
            [id], function (erro, dados, campos) {
                if (!erro) {
                    return res.status(200).json({ status: "USUARIO EXCLUÍDO COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO EXCLUIR USUARIO" })
                }
            })
    }
}

export { ControllerUsuario }


