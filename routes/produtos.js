const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        conn.query(
            'select * from produtos',
            (error, resultado, fields) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }
                return res.status(200).send({
                    response: resultado
                })
            }
        )
    })
})

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        conn.query(
            'insert into produtos (titulo, descricao, categoria, preco) values (?, ?, ?, ?)',
            [req.body.titulo, req.body.descricao, req.body.categoria, req.body.preco],
            (error, resultado, fields) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id: resultado.insertId
                })
            }
        )
    })
})

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        conn.query(
            'select * from produtos where id = ?',
            [req.params.id],
            (error, resultado, fields) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }
                return res.status(200).send({
                    response: resultado
                })
            }
        )
    })
})

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        conn.query(
            'update produtos set titulo = ?, descricao = ?, categoria = ?, preco = ? where id = ?',
            [req.body.titulo, req.body.descricao, req.body.categoria, req.body.preco, req.body.id],
            (error, resultado, fields) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso',
                })
            }
        )
    })
})

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }
        conn.query(
            'delete from produtos where id = ?',
            [req.body.id],
            (error, resultado, fields) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(202).send({
                    mensagem: 'Produto excluído com sucesso',
                })
            }
        )
    })
})

module.exports = router