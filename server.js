const express = require("express");
const session = require("express-session");
const body_parser = require("body-parser");
const app = express();
app.use(session({secret: "swordfish", resave: true, saveUninitialized: true}));
app.use(body_parser.urlencoded({extended: true}));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.get("/", function(req, res){
    res.render("index");
});
app.post("/submit", function(req, res){
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comment = req.body.comment;
    res.redirect("/result");
});
app.get("/result", function(req, res){
    results = {
        name: req.session.name,
        location: req.session.location,
        language: req.session.language,
        comment: req.session.comment,
    }
    res.render("result", results);
});
app.listen(8000);