import { NextFunction, Request, Response } from "express";
import { conexao } from "../../../db/conexao";

function validarCadastro(req: Request, res: Response, next: NextFunction) {
    const { nome, cpf, rg, data_nascimento, cep, cidade_id } = req.body
    if (nome === "") {
        return res.status(500).json({ status: "O NOME É UM CAMPO OBRIGATÓRIO" })
    } else if (typeof (nome) !== "string") {
        return res.status(500).json({ status: "O NOME DO CLIENTE NÃO PODE SER NÚMERICO" })
    } else if (cpf === "") {
        return res.status(500).json({ status: "O CPF É UM CAMPO OBRIGATÓRIO" })
    } else if (cpf.length < 11) {
        return res.status(500).json({ status: "O CPF PRECISA TER 11 DIGITOS" })
    } else if (rg === "") {
        return res.status(500).json({ status: "O RG É UM CAMPO OBRIGATÓRIO" })
    } else if (data_nascimento === "") {
        return res.status(500).json({ status: "A DATA DE NASCIMENTO É UM CAMPO OBRIGATÓRIO" })
    } else if (cep === "") {
        return res.status(500).json({ status: "O CEP É UM CAMPO OBRIGATÓRIO" })
    } else if (cidade_id === "" || cidade_id <= 0) {
        return res.status(500).json({ status: "CIDADE NÃO ENCONTRADA" })
    } else {
        next()
    }
}

function validarEdicao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { nome, cpf, rg, data_nascimento, cep, cidade_id } = req.body
    if (nome === "") {
        return res.status(500).json({ status: "O NOME É UM CAMPO OBRIGATÓRIO" })
    } else if (typeof (nome) !== "string") {
        return res.status(500).json({ status: "O NOME DO CLIENTE NÃO PODE SER NÚMERICO" })
    } else if (cpf === "") {
        return res.status(500).json({ status: "O CPF É UM CAMPO OBRIGATÓRIO" })
    } else if (cpf.length < 11) {
        return res.status(500).json({ status: "O CPF PRECISA TER 11 DIGITOS" })
    } else if (rg === "") {
        return res.status(500).json({ status: "O RG É UM CAMPO OBRIGATÓRIO" })
    } else if (data_nascimento === "") {
        return res.status(500).json({ status: "A DATA DE NASCIMENTO É UM CAMPO OBRIGATÓRIO" })
    } else if (cep === "") {
        return res.status(500).json({ status: "O CEP É UM CAMPO OBRIGATÓRIO" })
    } else if (cidade_id === "" || cidade_id <= 0) {
        return res.status(500).json({ status: "CIDADE NÃO ENCONTRADA" })
    } else if (Number(id) <= 0) {
        return res.status(500).json({ status: "ID É OBRIGATÓRIO" })
    } else {
        next()
    }
}

function validarExclusao(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    conexao.query(`DELETE FROM tbl_cliente WHERE id_cliente = ?`,
        [id],
        function (erro, dados: any, campos) {
            if (erro) {
                console.log(erro)
                return res.status(500).json({ status: "ERRO AO BUSCAR CLIENTE" })
            } else {
                console.log(dados)
                if (dados.length === 0) {
                    return res.status(500).json({ status: "CLIENTE NÃO ENCONTRADO" })
                }
                next()
            }
        })
}


export { validarCadastro, validarExclusao, validarEdicao }