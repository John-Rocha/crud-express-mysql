const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const Post = require('./models/Post')
const port = 3000

// Configuração da template engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Rotas
app.get('/', (req, res) => {
    Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
        res.render('home', {posts: posts})
    })
})

app.get('/cad', (req, res) => {
    res.render('formulario')
})

app.post('/add', (req, res) => {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/')
    }).catch(function(e){
        res.send('Erro ao enviar o post ' +e)
    })
})

app.get('/del/:id', (req, res) => {
    Post.destroy({where: {id: req.params.id}}).then(() => {
        res.redirect('/')
    }).catch((e) => {
        res.send('Esta postagem não existe! ')
    })
})

app.get('/editar/:id', (req, res) => {
    id = req.params.id;
    res.render('edit', {id:id})
})

app.post('/edit/:id', (req, res) => {
    id = req.params.id;
    Post.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
    },
    {
        where: {id: id}
    }).then(() => {
            res.redirect('/')
        })
    })
  

app.listen(port, () => {
    console.log(`Servidor http://localhost:${port}`)
})