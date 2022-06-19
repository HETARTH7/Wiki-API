const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
  Article.find((err, foundArticles) => {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

app.post("/articles", (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  article.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Perfect");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
