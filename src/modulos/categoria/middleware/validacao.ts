import { NextFunction, Request, Response } from "express";
import { conexao } from "../../../db/conexao";


function validarCadastro(req: Request, res: Response, next: NextFunction) {
    const { nome } = req.body
    if (nome === "") {
        return res.status(500).json({ status: "O NOME É UM CAMPO OBRIGATÓRIO" })
    } else if (typeof (nome) !== "string") {
        return res.status(500).json({ status: "O NOME DA CIDADE NÃO PODE SER NÚMERICO" })
    } else {
        next()
    }
}

function validarEdicao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { nome } = req.body
    if (nome === "") {
        return res.status(500).json({ status: "O NOME É UM CAMPO OBRIGATÓRIO" })
    } else if (typeof (nome) !== "string") {
        return res.status(500).json({ status: "O NOME DA CATEGORIA NÃO PODE SER NÚMERICO" })
    } else if (Number(id) <= 0) {
        return res.status(500).json({ status: "ID É OBRIGATÓRIO" })
    } else {
        next()
    }
}

function validarExclusao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    conexao.query(`DELETE FROM tbl_categoria WHERE id_categoria = ?`,
        [id],
        function (erro, dados: any, campos) {
            if (erro) {
                console.log(erro)
                return res.status(500).json({ status: "ERRO AO BUSCAR CATEGORIA" })
            } else {
                console.log(dados)
                if (dados.length === 0) {
                    return res.status(500).json({ status: "CATEGORIA NÃO ENCONTRADA" })
                }
                next()
            }
        })
}


export { validarCadastro, validarExclusao, validarEdicao }