const router = require("express").Router();
const users = require("../../../controllers/user");
const jwtCheck = require("../../../middlewares/auth");

router
  .route("/")
  .post(jwtCheck, users.create_user)
  .get(jwtCheck, users.find_all_users);
router
  .route("/id/:id")
  .get(jwtCheck, users.find_one_user)
  .put(jwtCheck, users.find_user_and_update);
router
  .route("/email/:email")
  .get(jwtCheck, users.find_user_by_email)
  .put(jwtCheck, users.find_user_by_email_and_update);

module.exports = router;
