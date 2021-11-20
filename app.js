const express = require('express')
app = express()

app.use((req, res, next) => {
    res.status(200).send({
        mensagem: 'Ok, deu certo!'
    })
})

module.exports = app