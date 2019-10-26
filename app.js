var express = require('express');
var todocontroller = require('./controlers/todocontroller');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static file
app.use(express.static('./public'));

//fire controllers
todocontroller(app);

//listen to port
app.listen(8000);
console.log('u are listening to port 8000');
