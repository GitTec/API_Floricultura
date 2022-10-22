import { Request, Response } from "express"
import { conexao } from "../../../db/conexao"

class ControllerCompra {
    buscar(req: Request, res: Response) {
        conexao.query("SELECT * FROM tbl_compra", function (erro, dados, campos) {
            if (erro) {
                console.log(erro)
                return res.status(500).json({ status: "ERRO AO BUSCAR COMPRAS" })
            } else {
                return res.status(200).json(dados)
            }
        })
    }

    encontrar(req: Request, res: Response) {
        const { id } = req.params
        conexao.query("SELECT * FROM tbl_compra WHERE id_Compra = ?",
            [id], function (erro, dados, campos) {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO BUSCAR COMPRA" })
                } else {
                    return res.status(200).json(dados)
                }
            })
    }

    cadastrar(req: Request, res: Response) {
        const { valor_compra, data_compra, clientes_id } = req.body
        conexao.query("INSERT INTO tbl_compra (valor_compra, data_compra, clientes_id) VALUES (?, ?, ?)",
            [valor_compra, data_compra, clientes_id],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(201).json({ status: "COMPRA CADASTRADA COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO CADASTRAR COMPRA" })
                }
            })
    }

    editar(req: Request, res: Response) {
        const { id } = req.params
        const { valor_compra, data_compra, clientes_id } = req.body
        conexao.query("UPDATE tbl_compra SET valor_compra = ?, data_compra = ?, clientes_id = ? WHERE id_Compra = ?",
            [valor_compra, data_compra, clientes_id, id], function (erro, dados, campos) {
                if (!erro)
                    return res.status(200).json({ status: 'COMPRA EDITADA COM SUCESSO' })
                else {
                    console.log(erro)
                    return res.status(500).json({ status: 'ERRO AO EDITAR COMPRA' })
                }
            })
    }

    excluir(req: Request, res: Response) {
        const { id } = req.params
        conexao.query("DELETE FROM tbl_compra WHERE id_Compra = ?",
            [id], function (erro, dados, campos) {
                if (!erro)
                    return res.status(200).json({ status: 'COMPRA EXCLUÍDA COM SUCESSO' })
                else {
                    console.log(erro)
                    return res.status(500).json({ status: 'ERRO AO EXCLUIR COMPRA' })
                }
            })
    }
}

export { ControllerCompra }