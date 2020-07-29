const router = require("express").Router();
const protests = require("../../../controllers/protest");

//  Route - /api/protests
router.route("/").get(protests.find_all_protests).post(protests.create_protest);
// Route - /api/protests/{protestId}
router
  .route("/:id")
  .get(protests.find_one_protest)
  .put(protests.find_protest_and_update);

module.exports = router;
