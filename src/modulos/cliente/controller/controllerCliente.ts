import { Request, Response } from "express"
import { conexao } from "../../../db/conexao"

class ControllerCliente {
    buscar(req: Request, res: Response) {
        conexao.query("SELECT * FROM tbl_cliente",
            function (erro, dados, campos) {
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
        conexao.query("SELECT * FROM tbl_cliente WHERE id_cliente = ?",
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
        const { nome, cpf, rg, data_nascimento, telefone, logradouro, num_casa, cep, complemento, referencia, bairro, cidade_id } = req.body
        conexao.query("INSERT INTO tbl_cliente (nome, cpf, rg, data_nascimento, telefone, logradouro, num_casa, cep, complemento, referencia, bairro, cidade_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
            [nome, cpf, rg, data_nascimento, telefone, logradouro, num_casa, cep, complemento, referencia, bairro, cidade_id],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(201).json({ status: "CLIENTE CADASTRADO COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO CADASTRAR CLIENTE" })
                }
            })
    }

    editar(req: Request, res: Response) {
        const { id } = req.params
        const { nome, cpf, rg, data_nascimento, telefone, logradouro, num_casa, cep, complemento, referencia, bairro, cidade_id } = req.body
        conexao.query("UPDATE tbl_cliente SET nome = ?, cpf = ?, rg = ?, data_nascimento = ?, telefone = ?, logradouro = ?, num_casa = ?, cep = ?, complemento= ?, referencia = ?, bairro = ?, cidade_id = ? WHERE id_cliente = ?",
            [nome, cpf, rg, data_nascimento, telefone, logradouro, num_casa, cep, complemento, referencia, bairro, cidade_id, id],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(200).json({ status: "CLIENTE EDITADO COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO EDITAR CLIENTE" })
                }
            })
    }

    excluir(req: Request, res: Response) {
        const { id } = req.params
        conexao.query("DELETE FROM tbl_cliente WHERE id_cliente = ?",
            [id], function (erro, dados, campos) {
                if (!erro) {
                    return res.status(200).json({ status: "CLIENTE EXCLUÍDO COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO EXCLUIR CLIENTE" })
                }
            })
    }
}

export { ControllerCliente }