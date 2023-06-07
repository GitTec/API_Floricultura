import { NextFunction, Request, Response } from "express";
import { conexao } from "../../../db/conexao";


function validarCadastro(req: Request, res: Response, next: NextFunction) {
    const { nome, sigla } = req.body
    if (nome === "") {
        return res.status(500).json({ status: "NOME DO ESTADO É UM CAMPO OBRIGATÓRIO" })
    } else if (sigla === "") {
        return res.status(500).json({ status: "SIGLA DO ESTADO É UM CAMPO OBRIGATÓRIO" })
    } else {
        next()
    }
}

function validarEdicao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { nome, sigla } = req.body
    if (nome === "") {
        return res.status(500).json({ status: "NOME DO ESTADO É UM CAMPO OBRIGATÓRIO" })
    } else if (sigla === "") {
        return res.status(500).json({ status: "SIGLA DO ESTADO É UM CAMPO OBRIGATÓRIO" })
    } else if (Number(id) <= 0) {
        return res.status(500).json({ status: "ID É OBRIGATÓRIO" })
    } else {
        next()
    }
}


function validarExclusao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    conexao.query("DELETE FROM tbl_estado WHERE id_Estado = ?",
        [id],
        function (erro, dados: any, campos) {
            if (erro) {
                console.log(erro)
                return res.status(500).json({ status: "ERRO AO BUSCAR ESTADO" })
            } else {
                console.log(dados)
                if (dados.length === 0) {
                    return res.status(500).json({ status: "ESTADO NÃO ENCONTRADO" })
                }
                next()
            }
        })
}


export { validarCadastro, validarExclusao, validarEdicao }