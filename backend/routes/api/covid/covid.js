const router = require("express").Router();
const covidController = require("../../../controllers/covid");

router.route("/all").get(covidController.get_all_data);

router
  .route("/area/:neLat/:neLong/:swLat/:swLong")
  .get(covidController.get_map_report);

module.exports = router;
