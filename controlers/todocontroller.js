var bodyparser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://todo:todo@todo-qyffo.mongodb.net/test?retryWrites=true&w=majority');

//create a schema - this is like a blueprint
var todoschema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoschema);
// var itemone = Todo({
//   item: 'get flowers'
// }).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// });

//var data =[{item: 'get milk'},{item: 'walk dog'}, {item: 'Do some coding'}, {item: 'go play'}];
var urlencodedParser = bodyparser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo',function(req,res){
    //get data from mongo db and pass it to the view
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todo', {todos: data});
    });

  });

  app.post('/todo', urlencodedParser, function(req,res){
    //get data from the view and add it to mongodb
    var newtodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    });
    // data.push(req.body);
    // res.json(data);
  });

  app.delete('/todo/:item',function(req,res){
    //delete the requested item from mongo db
      Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
      });
    // data = data.filter(function(todo){
    //   return todo.item.replace(/ /g,'-') !== req.params.item;
    // });
    // res.json(data);
  });


};
