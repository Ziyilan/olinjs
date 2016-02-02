var exphbs = require('express-handlebars'); 

var express = require('express');
var index = require('./routes/index');
var cats = require('./routes/cats');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/catbase');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/cats/new', cats.newcats);
app.get('/cats', cats.listcats);
app.get('/cats/bycolor/:color', cats.catcolor);
app.get('/cats/delete/old', cats.deletecat);
app.get('/cats/age', cats.catage);

app.listen(3000);