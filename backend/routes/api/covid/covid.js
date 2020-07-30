const router = require("express").Router();
const covidController = require("../../../controllers/covid");
const jwtCheck = require("../../../middlewares/auth");

router.route("/all").get(covidController.get_all_data);

router
  .route("/area/:neLat/:neLong/:swLat/:swLong")
  .get(jwtCheck, covidController.get_map_report);

module.exports = router;
