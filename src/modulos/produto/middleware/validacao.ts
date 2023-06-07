import { NextFunction, Request, Response } from "express";
import { conexao } from "../../../db/conexao";


function validarCadastro(req: Request, res: Response, next: NextFunction) {
    const { nome_produto, preco, categoria_id } = req.body
    if (nome_produto === "") {
        return res.status(500).json({ status: "NOME DO PRODUTO É UM CAMPO OBRIGATÓRIO" })
    } else if (preco === "") {
        return res.status(500).json({ status: "PREÇO DO PRODUTO É UM CAMPO OBRIGATÓRIO" })
    } else if (categoria_id === "" || categoria_id <= 0) {
        return res.status(500).json({ status: "CATEGORIA NÃO ENCONTRADA" })
    } else {
        next()
    }
}

function validarEdicao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { nome_produto, preco, categoria_id } = req.body
    if (nome_produto === "") {
        return res.status(500).json({ status: "NOME DO PRODUTO É UM CAMPO OBRIGATÓRIO" })
    } else if (preco === "") {
        return res.status(500).json({ status: "PREÇO DO PRODUTO É UM CAMPO OBRIGATÓRIO" })
    } else if (categoria_id === "" || categoria_id <= 0) {
        return res.status(500).json({ status: "CATEGORIA NÃO ENCONTRADA" })
    } else if (Number(id) <= 0) {
        return res.status(500).json({ status: "ID É OBRIGATÓRIO" })
    } else {
        next()
    }
}


function validarExclusao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    conexao.query("DELETE FROM tbl_produtos WHERE id_produtos = ?",
        [id],
        function (erro, dados: any, campos) {
            if (erro) {
                console.log(erro)
                return res.status(500).json({ status: "ERRO AO BUSCAR PRODUTO" })
            } else {
                console.log(dados)
                if (dados.length === 0) {
                    return res.status(500).json({ status: "PRODUTO NÃO ENCONTRADO" })
                }
                next()
            }
        })
}


export { validarCadastro, validarExclusao, validarEdicao }