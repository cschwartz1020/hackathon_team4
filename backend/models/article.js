const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  source: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  urlToImage: {
    type: String,
  },
  publishedAt: {
    type: String,
  },
  content: {
    type: String,
  },
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
