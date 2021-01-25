const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')

const port = 3000

// Configuração da template engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Rotas

app.get('/cad', (req, res) => {
    res.render('formulario')
})

app.post('/add', (req, res) => {
    const body = req.body
    res.send("Texto: " +body.titulo+"<br> Conteudo: " +body.conteudo)
})

app.listen(port, () => {
    console.log(`Servidor http://localhost:${port}`)
})