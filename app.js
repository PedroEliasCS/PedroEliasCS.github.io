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

//
//{
    //format: 'dev', 
  //  stream: fs.createWriteStream('app.log', {'flags': 'w'}
//
app.use(logger({
  format: 'dev',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html') // seta html como render padrão

var home = require('./routes/index');
app.use('/', home);


let calculadora = require('./routes/calculadora');
const { fstat } = require('fs');
app.use('/', calculadora)

module.exports = app;
