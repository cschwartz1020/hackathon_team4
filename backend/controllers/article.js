articleServices = require("../services/article");
async function get_all_articles(req, res) {
  await articleServices.getAllData(req, res);
}
async function get_random_articles(req, res) {
  await articleServices.getRandomArticles(req, res);
}

module.exports.get_all_articles = get_all_articles;
module.exports.get_random_articles = get_random_articles;
