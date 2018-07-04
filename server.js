var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'yourmysqlpassword',
  database : 'sample'
});

connection.connect();

app.use(express.static(__dirname + "/src"));



//Get the blog posts from database
app.get('/getBlogPosts', function (req, res) {
	
var query = connection.query('SELECT * from blogpost ORDER BY id DESC', function(err, rows, fields) {
  if (err) throw err;
  //console.log(rows);
  res.json(rows);
});	
});


//Create a new blog post entry in the database
app.post('/createBlogPost', function(req,res){

  console.log(req.body.title);
  console.log(req.body.body);
  console.log(req.body.user);
  var db_title = req.body.title;
  var db_body = req.body.body;
  var db_user = req.body.user;
  //res.json(req.body.title);
  var post  = {title: db_title, body: db_body, user: db_user};
  var query = connection.query('INSERT INTO blogpost SET ?',post,
  	function(err, result) {
    console.log(result);
    res.json(db_title);
  });
});


//Updating a given entry based on the ID


app.put('/updateBlogPost/:id/:title/:body', function (req, res) {

    var uID = req.params.id;
    var uTitle = req.params.title;
    var uBody = req.params.body;

    var update = {title: uTitle, body: uBody};

    var query = connection.query('UPDATE blogpost SET ? WHERE id ='+connection.escape(uID), update, function(err, result) {
              res.send(result);
    });    
});


//Delete a given entry based on the ID



app.delete('/deleteBlogPost/:id', function (req,res) {

  console.log(req.params.id);
  res.send(req.params.id);
  var userId = req.params.id;
  var query = connection.query('DELETE FROM blogpost WHERE id = '+connection.escape(userId), function (err, result) {
    if (err) throw err;
    console.log('deleted ' + result.affectedRows + ' rows');
});

});

app.listen(3000);

console.log("Server running on port 3000");
