const db = require("../config/mongo");
const fetch = require("node-fetch");
const random = require("random");

const getAllData = async (req, res) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  var news = {
    status: "",
    totalResults: 0,
    articles: [],
  };

  for (let i = 1; i < 6; i++) {
    try {
      await fetch(
        `https://newsapi.org/v2/everything?q=protest%20OR%20Covid&apiKey=${process.env.NEWS_API_KEY}&page=${i}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (i === 1) {
            news.status = result.status;
            news.totalResults = result.totalResults;
          }
          if (result.status == "ok") {
            result.articles.forEach((article) => {
              news.articles.push(article);
            });
          }
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              "Some error ocurred while fetching from news api",
          });
        });
    } catch (err) {
      res.status(500).send({
        message:
          error.message || "Some error ocurred while fetching from news api",
      });
    }
  }

  res.status(200).json(news);
};

const getRandomArticles = async (req, res) => {
  var n = req.params.n > 100 ? 100 : parseInt(req.params.n, 10);
  var totalDocs;
  await db.Article.countDocuments({}, function (err, result) {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while fetching ${n} news articles`,
      });
    }
    totalDocs = result;
  });
  try {
    await db.Article.find()
      .limit(n)
      .skip(random.float() * totalDocs)
      .then((articles) => {
        res.status(200).json(articles);
      });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || `Some error occurred while fetching ${n} news articles`,
    });
  }
};

module.exports.getAllData = getAllData;
module.exports.getRandomArticles = getRandomArticles;
