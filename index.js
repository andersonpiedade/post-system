const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./modules/Post');
const { where } = require('sequelize');

//Config handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions:{allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true}}));
app.set('view engine', 'handlebars');

//config bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Listando todos os registros da postagens na página web;
app.get('/posts', (req,res)=>{
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        console.log(posts);
        res.render('posts',{posts: posts});
    })
});

// Rotas da minha app

app.get('/', (req,res)=>{
    res.render('home');
});

app.get('/form', (req,res)=>{
    res.render('form');
});

app.post('/add', (req,res)=>{
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(()=>{
        res.redirect('posts')
    }).catch((error)=>{
        res.send('Houve um erro ' + error);
    });
});


// Apagando postagens

app.get('/delete/:id',function(req,res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send('Post deletado  com sucesso');
    }).catch(function(error){
        res.send('falha ' + error);
    });
});

app.listen(3000, ()=>{
    console.log('Server is running at port: 3000');
});