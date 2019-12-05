let express = require('express');
let mongodb = require('mongodb');
let server = express();
let path = require('path');
let dbName = 'todoApp-db'
let connectionString = `mongodb+srv://sebasz1000:s90120350063@cluster01-cjtxa.mongodb.net/${dbName}?retryWrites=true&w=majority`;  //offered by MongoAtlas(cloud)
let db = null;

server.use(express.urlencoded({ extended: false }));

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true} , function(err, client){
    if(err){
        console.log('Mongo Db Connection Error')
    }else{
        db = client.db();
        db != null && server.listen(3000);
    }  
});


server.get('/', function(req, res){
    db.collection('Items').find().toArray(function(err, items){
    //!err && res.sendFile(path.join(__dirname + '/index.html'));
    !err && res.send(`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple To-Do App</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <h1 class="display-4 text-center py-1">To-Do App</h1>
        
        <div class="jumbotron p-3 shadow-sm">
          <form action="/create-item" method="POST">
            <div class="d-flex align-items-center">
              <input autofocus name="itemName" autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Add New Item</button>
            </div>
          </form>
        </div>
        
        <ul class="list-group pb-5">
          ${items.map(function(item){
            return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.itemName}</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>`
          }).join("")}
        </ul>
        
      </div>
      
    </body>
    </html>`);
    })
});

server.post('/create-item', function(req, res){
    db.collection('Items').insertOne({ itemName: req.body.itemName }, function(){
    res.redirect('/');
    })
});


