const router = require("express").Router();
const articleController = require("../../../controllers/article");
const jwtCheck = require("../../../middlewares/auth");

router.route("/all").get(articleController.get_all_articles);
router.route("/:n").get(jwtCheck, articleController.get_random_articles);

module.exports = router;
