import { NextFunction, Request, Response } from "express";
import { conexao } from "../../../db/conexao";

function validarCadastro(req: Request, res: Response, next: NextFunction) {
    const { nome, login, senha, email } = req.body
    if (nome === "") {
        return res.status(500).json({ status: "O NOME É UM CAMPO OBRIGATÓRIO" })
    } else if (typeof (nome) !== "string") {
        return res.status(500).json({ status: "O NOME DO USUARIO NÃO PODE SER NÚMERICO" })
    } else {
        next()
    }
}

function validarEdicao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { nome, login, senha, email } = req.body
    if (nome === "") {
        return res.status(500).json({ status: "O NOME É UM CAMPO OBRIGATÓRIO" })
    } else if (typeof (nome) !== "string") {
        return res.status(500).json({ status: "O NOME DO USUARIO NÃO PODE SER NÚMERICO" })
    } else if (Number(id) <= 0) {
        return res.status(500).json({ status: "ID É OBRIGATÓRIO" })
    } else {
        next()
    }
}

function validarExclusao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    conexao.query('DELETE FROM tbl_usuario WHERE id_usuario = ?',
        [id],
        function (erro, dados: any, campos) {
            if (erro) {
                console.log(erro)
                return res.status(500).json({ status: "ERRO AO BUSCAR USUARIO" })
            } else {
                console.log(dados)
                if (dados.length === 0) {
                    return res.status(500).json({ status: "USUARIO NÃO ENCONTRADO" })
                }
                next()
            }
        })
}

export { validarCadastro, validarEdicao, validarExclusao }