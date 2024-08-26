const express = require("express");
const app = express();
const port = 5000;
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
const appBaseUrl = process.env.APP_BASE_URL || 'http://localhost:5000'; // Fallback for local development


const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    res.locals.BASE_URL = process.env.BASE_URL || 'http://localhost:5000'; // Fallback URL for local development
    next();
});

app.get('/', (req, res) => {
    res.render('index.ejs', { posts, baseUrl: appBaseUrl });
});

let posts = [

    {  id:uuidv4(),
        username: "ganesh",
        content: "i have secured rank"

    },
    {     id:uuidv4(),
        username: "adasrh",
        content: "i have second rank rank"

    },

];


app.get('/', (req, res) => {
    res.render('index', { posts }); // Render the index.ejs template with posts data
});
app.get("/posts", (req, res) => {
     res.render("index.ejs",{posts});



});
app.get("/posts/new", (req,res)=> {
   res.render("new.ejs");

});
app.post("/posts",(req,res) =>{
let id =uuidv4();
let {username,content}=req.body;
posts.push({id,username,content});
res.redirect("/posts")

});
app.get("/posts/:id",(req,res)=>{
  let  {id} =req.params;
  let post=posts.find((p) => id===p.id);
  console.log(post);
  res.render("show.ejs",{post});



});
app.get("/posts/:id/edit", (req, res) => {
    let  { id } = req.params;
 let post = posts.find((p) =>id===p.id);
 res.render("edit.ejs", { post });
});


app.patch("/posts/:id",(req,res) => {
    let { id } =req.params;
    console.log(req.body);
    let newContent=req.body.content;
    let post =posts.find((p)=>id===p.id);
    post.content=newContent;
    res.redirect("/posts");



});
app.delete("/posts/:id",(req,res) => {

let{ id }= req.params;
posts=posts.filter((p) => id !==p.id);
res.redirect("/posts");

});

app.listen(port, () => {

    console.log("okayy");

});