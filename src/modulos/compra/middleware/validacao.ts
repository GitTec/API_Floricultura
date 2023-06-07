import { NextFunction, Request, Response } from "express";
import { conexao } from "../../../db/conexao";


function validarCadastro(req: Request, res: Response, next: NextFunction) {
    const { valor_compra, clientes_id } = req.body
    if (valor_compra === "") {
        return res.status(500).json({ status: "VALOR DA COMPRA É UM CAMPO OBRIGATÓRIO" })
    } else if (clientes_id === "" || clientes_id <= 0) {
        return res.status(500).json({ status: "CLIENTE NÃO ENCONTRADO" })
    } else {
        next()
    }
}

function validarEdicao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { valor_compra, clientes_id } = req.body
    if (valor_compra === "") {
        return res.status(500).json({ status: "VALOR DA COMPRA É UM CAMPO OBRIGATÓRIO" })
    } else if (clientes_id === "" || clientes_id <= 0) {
        return res.status(500).json({ status: "CLIENTE NÃO ENCONTRADO" })
    } else if (Number(id) <= 0) {
        return res.status(500).json({ status: "ID É OBRIGATÓRIO" })
    } else {
        next()
    }
}

//registrar log de acesso, restringir acesso(autenticar), subir arquivos, validar campos
function validarExclusao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    conexao.query("DELETE FROM tbl_compra WHERE id_Compra = ?",
        [id],
        function (erro, dados: any, campos) {
            if (erro) {
                console.log(erro)
                return res.status(500).json({ status: "ERRO AO BUSCAR COMPRA" })
            } else {
                console.log(dados)
                if (dados.length === 0) {
                    return res.status(500).json({ status: "COMPRA NÃO ENCONTRADA" })
                }
                next()
            }
        })
}


export { validarCadastro, validarExclusao, validarEdicao }