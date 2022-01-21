//jshint esversion:6

const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent ="Hey Guys & Girls, This is my First Blog Website. Even though i haven't host it on any Good Server, But Still you can import this project into your System and then you have to run app.js file through your cmd then just go to your Browser's Home Page and Search localhost:3000 <br> You can add your Blogs by searching localhost:3000/compose in the Search Bar...Have a Good Day!!";
const aboutContent = "This is the version 1.0 of my Blog-Website, you can add your thoughts too in the form of a Blog. This will have more features in future... So, Till then enjoy this version...";
const contactContent = "Mail id:- pryanshubharti9412@gmail.com";

let posts = [];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', function(req,res){
  res.render('home',{
    startingContent : homeStartingContent ,
    posts : posts
  })
  //console.log(posts);
});

app.get('/about', function(req, res){
  res.render('about',{
    aboutDetails : aboutContent
  });
})

app.get('/contact', function(req, res){
  res.render('contact',{
    contactDetails : contactContent
  });
})

app.get('/compose', function(req,res){
  res.render('compose.ejs');
})

app.post('/compose', function(req,res){
  const post = {
    title: req.body.postTitle,
    content: req.body.post
  };
  posts.push(post);

  res.redirect('/');
})

app.get('/posts/:topic', function(req,res)
{
const requestedTitle = _.lowerCase(req.params.topic);

posts.forEach(function(post)
  {
    const storedTitle = _.lowerCase(post.title);
    if(storedTitle === requestedTitle){

      res.render('post.ejs',{
        title : post.title,
        content : post.content
      });
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
