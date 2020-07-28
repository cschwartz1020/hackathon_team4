const router = require("express").Router();
const covidController = require("../../../controllers/covid");

router.route("/coordinates").post(covidController.post_coordinates);

module.exports = router;
