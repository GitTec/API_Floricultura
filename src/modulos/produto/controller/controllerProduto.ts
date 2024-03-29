import { Request, Response } from "express";
import { conexao } from "../../../db/conexao"

class ControllerProduto {
    buscar(req: Request, res: Response) {
        conexao.query("SELECT p.id_Produtos as id, p.nome_produto, p.preco, p.qtd_estoque,c.id_categoria as id_categoria, c.nome as categoria_nome FROM tbl_produtos p inner join tbl_categoria c on p.categoria_id = c.id_categoria        ", function (erro, dados, campo) {
            if (erro)
                console.log(erro)
            return res.json(dados)
        })
    }

    encontrar(req: Request, res: Response) {
        const { id } = req.params
        conexao.query('SELECT p.id_Produtos as id, p.nome_produto, p.preco, p.qtd_estoque,c.id_categoria as id_categoria, c.nome as categoria_nome FROM tbl_produtos p inner join tbl_categoria c on p.categoria_id = c.id_categoria WHERE p.id_produtos = ?',
            [id],
            function (erro, dados, campo) {
                if (erro)
                    console.log(erro)
                return res.json(dados);
            })
    }

    cadastrar(req: Request, res: Response) {
        const { nome_produto, preco, qtd_estoque, categoria_id } = req.body
        conexao.query('INSERT INTO tbl_produtos (nome_produto, preco, qtd_estoque, categoria_id) values (?, ?, ?, ?)',
            [nome_produto, preco, qtd_estoque, categoria_id],
            function (erro, dados, campo) {
                if (!erro) {
                    return res.status(201).json({ status: "PRODUTO CADASTRADO COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO CADASTRAR PRODUTO" })
                }
            })
    }

    editar(req: Request, res: Response) {
        const { id } = req.params
        const { nome_produto, preco, qtd_estoque, categoria_id } = req.body
        conexao.query('UPDATE tbl_produtos SET nome_produto = ?, preco = ?, qtd_estoque = ?, categoria_id = ? WHERE id_Produtos = ?',
            [nome_produto, preco, qtd_estoque, categoria_id, id],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(200).json({ status: 'PRODUTO EDITADO COM SUCESSO' })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: 'ERRO AO EDITAR PRODUTO' })
                }
            })
    }

    excluir(req: Request, res: Response) {
        const { id } = req.params
        conexao.query('DELETE FROM tbl_produtos WHERE id_produtos = ?',
            [id],
            function (erro, dados, campos) {
                if (!erro) {
                    return res.status(200).json({ status: "PRODUTO EXCLUÍDO COM SUCESSO" })
                } else {
                    console.log(erro)
                    return res.status(500).json({ status: "ERRO AO EXCLUIR PRODUTO" })
                }
            })
    }
}

export { ControllerProduto }



