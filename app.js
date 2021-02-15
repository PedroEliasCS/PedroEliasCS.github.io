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

//let indexRouter = require('./routes/index');
//app.use('/', indexRouter);

let user = require('./routes/user')
app.use('/user', user)

let category = require('./routes/category')
app.use('/category', category)

//let calculadora = require('./routes/calculadora');
//app.use('/calculadora', calculadora)

module.exports = app;
