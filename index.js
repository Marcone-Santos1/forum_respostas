const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados');
    })
    .catch((erro) => {
        console.log(erro);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then((perguntas) => {
        res.render('index', {
            perguntas
        });
    });
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id

    Pergunta.findOne({
        where: {
            id
        }
    }).then((pergunta) => {
        if (pergunta != undefined) {

            Resposta.findAll({
                order: [
                    ['id', 'DESC']
                ],
                where: { perguntaid: id}
            }).
            then((respostas) => {
                res.render('pergunta', {
                    pergunta,
                    respostas
                });
            })

        } else {
            res.redirect('/');
        }

    })
})

app.post('/salvarpergunta', (req, res) => {
    let titulo = req.body.titulo
    let descricao = req.body.descricao

    Pergunta.create({
        titulo,
        descricao
    }).then(() => {
        res.redirect('/');
    })
});

app.post('/responder', (req, res) => {
    let corpo = req.body.resposta
    let id = req.body.id

    Resposta.create({
        corpo,
        perguntaId: id
    }).then(() => {
        res.redirect('/pergunta/' + id);
    })
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`)
});