const router = require("express").Router();
const users = require("../../../controllers/user");

router.route("/").post(users.create_user).get(users.find_all_users);
router.route("/:id").get(users.find_one_user);

module.exports = router;
