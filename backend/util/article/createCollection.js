const db = require("../../config/mongo");
const fetch = require("node-fetch");
const mongoose = require("mongoose");

async function createCollectionIfNotExists() {
  const conn = mongoose.createConnection("mongodb://mongo:27017/hackathonDB");
  var articlesExists = false;
  conn.on("open", function () {
    conn.db.listCollections().toArray(function (err, collectionNames) {
      if (err) {
        console.log(err);
        return;
      }
      collectionNames.forEach((collection) => {
        if (collection.name === "articles") {
          articlesExists = true;
        }
      });
      if (!articlesExists) {
        dumpData();
      }
      conn.close();
    });
  });

  async function dumpData() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        Accept: "application/json",
      },
    };

    await fetch("http://localhost:3000/api/article/all", requestOptions)
      .then((response) => response.json())
      .then((result) => result.articles)
      .then((news) => prepareForMongo(news))
      .catch((error) => console.log("error", error));
  }
}

function prepareForMongo(news) {
  news.forEach((article) => {
    db.Article.create({
      source: article.source,
      author: article.author,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content,
    }).catch((err) => {
      console.log(
        err.message,
        "Some error occurred while creating Articles collection"
      );
      return;
    });
  });

  console.log("Succesfully created Articles collection");
}

module.exports.createCollectionIfNotExists = createCollectionIfNotExists;
