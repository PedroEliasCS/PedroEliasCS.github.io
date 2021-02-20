var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Configurando variaveis de ambiente
require('dotenv').config()

const dbname = process.env.DBNAME
const dbuser = process.env.DBUSER
const dbpass = process.env.DBPASS

//chamada de banco de dados
const db = require('./config/database')
db(`mongodb+srv://${dbuser}:${dbpass}@cluster0.cc1xi.gcp.mongodb.net/${dbname}?retryWrites=true&w=majority`)

var app = express();
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html') // seta html como render padrão



// paginas do site abaixo

let pags = require("./routes/index")
app.use('/', pags)

// fim das paginas do site


// inicio dos crud's de DB

let user = require('./routes/user')
app.use('/user', user)

let category = require('./routes/category')
app.use('/category', category)

let calculation = require('./routes/calculation')
app.use('/calculation', calculation)

let comment = require('./routes/comments')
app.use('/comment', comment)

const Category = require('./models/Category')
const Calculation = require('./models/Calculation')

app.get("/:slug", async (req, res) => {
    
    try {
        let slug = req.params.slug
        console.log('aqui : ', slug)
        let obj = await Calculation.findOne({
            "slug": slug
        })
        if (obj) res.send(obj)
        else res.status(404).end()
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

app.use("/pag/:slug/:page", async (req, res) => {
    try {
        let vet = []
        let page = req.params.page
        //skip define o numero de elementos a serem exibidos
        let offset = 0
        let skip = 3
        let slug = req.params.slug
        let obj = await Category.findOne({
            "slug": slug
        })
        
        vet = await Calculation.find({
            "category": obj._id
        }).populate('category', "title").populate('author', "name aboutMe")
        if(isNaN(page) || page == 1){
            offset = 0
        } else {
            offset = (parseInt(page) - 1) * skip
        }
        vet = vet.slice(offset, offset + skip)
        res.send(vet)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

// fim dos crud's de db

module.exports = app;
