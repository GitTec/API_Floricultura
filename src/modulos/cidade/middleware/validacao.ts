import { NextFunction, Request, Response } from "express";
import { conexao } from "../../../db/conexao";


function validarCadastro(req: Request, res: Response, next: NextFunction) {
    const { nome, estado_id } = req.body
    if (nome === "") {
        return res.status(500).json({ status: "O NOME É UM CAMPO OBRIGATÓRIO" })
    } else if (estado_id === "" || estado_id <= 0) {
        return res.status(500).json({ status: "ESTADO NÃO ENCONTRADO" })
    } else {
        next()
    }
}

function validarEdicao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { nome, estado_id } = req.body
    if (nome === "") {
        return res.status(500).json({ status: "O NOME É UM CAMPO OBRIGATÓRIO" })
    } else if (estado_id === "" || estado_id <= 0) {
        return res.status(500).json({ status: "ESTADO NÃO ENCONTRADO" })
    } else if (Number(id) <= 0) {
        return res.status(500).json({ status: "ID É OBRIGATÓRIO" })
    } else {
        next()
    }
}

//registrar log de acesso, restringir acesso(autenticar), subir arquivos, validar campos
function validarExclusao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    conexao.query("SELECT * FROM tbl_cidade WHERE id_Cidade = ?",
        [id],
        function (erro, dados: any, campos) {
            if (erro) {
                console.log(erro)
                return res.status(500).json({ status: "ERRO AO BUSCAR CIDADE" })
            } else {
                console.log(dados)
                if (dados.length === 0) {
                    return res.status(500).json({ status: "CIDADE NÃO ENCONTRADA" })
                }
                next()
            }
        })
}


export { validarExclusao, validarCadastro }