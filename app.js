
const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const homeStartingContent ="Hey Guys & Girls, This is my First Blog Website. You can also make a new Post by going on :- localhost:4000/compose in the Search Bar...Have a Good Day!!";
const aboutContent = "This is the version 2.0 of my Blog-Website, you can add your thoughts too in the form of a Blog. This will have more features in future... So, Till then enjoy this version...";
const contactContent = "Mail id:- pryanshubharti9412@gmail.com";

mongoose.connect("mongodb+srv://admin-py:pypriyanshu@cluster0.x67qb.mongodb.net/blogwebsiteDB",{useNewUrlParser : true});

const postSchema ={
  title : String,
  content : String
};

const Post = mongoose.model('Post',postSchema);

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
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.post
  });
  posts.push(post);

  post.save();


  // Post.find({}, function(err, foundItems){
  //   console.log(foundItems);
  // });

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
let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started Successfully");
});