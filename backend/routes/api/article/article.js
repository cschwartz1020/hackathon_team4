const router = require("express").Router();
const articleController = require("../../../controllers/article");

router.route("/all").get(articleController.get_all_articles);
router.route("/:n").get(articleController.get_random_articles);

module.exports = router;
