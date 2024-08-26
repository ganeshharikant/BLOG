const express = require("express");
const app = express();
const port = process.env.PORT || 5000; // Use environment port or fallback to 5000
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const path = require("path");

// Set up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));

// Set base URL
const appBaseUrl = process.env.APP_BASE_URL || 'http://localhost:5000';
app.use((req, res, next) => {
    res.locals.baseUrl = appBaseUrl; // Use baseUrl in templates
    next();
});

// Sample posts data
let posts = [
    { id: uuidv4(), username: "ganesh", content: "I have secured rank" },
    { id: uuidv4(), username: "adasrh", content: "I have second rank" },
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts }); // Render the index.ejs template with posts data
});

app.get("/posts", (req, res) => {
    res.render("index", { posts }); // Render the index.ejs template with posts data
});

app.get("/posts/new", (req, res) => {
    res.render("new"); // Render the new.ejs template
});

app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    posts.push({ id: uuidv4(), username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => id === p.id);
    res.render("show", { post }); // Render the show.ejs template with post data
});

app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => id === p.id);
    res.render("edit", { post }); // Render the edit.ejs template with post data
});

app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = posts.find((p) => id === p.id);
    if (post) {
        post.content = content;
    }
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
