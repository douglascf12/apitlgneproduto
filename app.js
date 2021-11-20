const express = require('express')
app = express()

app.user((req, res, next) => {
    res.status(200).send({
        mensagem: 'Ok, deu certo!'
    })
})

module.exports = app