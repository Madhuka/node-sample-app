var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'secret key'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;

app.get('/',function(req,res){
sess = req.session;
//Session set when user Request our app via URL
if(sess.email) {
/*
* This line check Session existence.
* If it existed will do some action.
*/
    res.redirect('/admin');
}
else {
    res.render('index.html');
}
});

app.post('/login',function(req,res){
  sess = req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
  sess.email=req.body.email;
  res.end('done');
});

app.get('/admin',function(req,res){
  sess = req.session;
if(sess.email) {
res.write('<h1>Hello '+sess.email+'</h1>');
console.log(sess.email);
res.end('<a href="/logout">Logout</a>');
} else {
    res.write('<h1>Please login first.</h1>');
    res.end('<a href="../">Login</a>');
}
});

app.get('/test',function(req,res){
  sess = req.session;
console.log(sess);
res.write('<h1>Helsslo  test'+sess.email+'</h1>');
});

app.get('/test2',function(req,res){
  sess = req.session;
console.log(sess.email);
res.write('<h1>Hetest2llo '+sess.email+'</h1>');
});



app.get('/logout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
  
    res.redirect('/');
  }
});

});
app.listen(3000,function(){
console.log("App Started on PORT 3000");
});