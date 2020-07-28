const router = require("express").Router();
const iplocate = require("node-iplocate");
const protests = require("../../controllers/protest");

//  Route - /api/protests
router.route("/").get(protests.find_all_protests).post(protests.create_protest);
// Route - /api/protests/{protestId}
router.route("/:id").get(protests.find_one_protest);

// Route - /api/protests/example
router.route("/example").get(async (req, res) => {
  var protest = {
    time: new Date(),
    location: null,
    title: "example protest title",
    summary: "example protest summary",
    resources: [
      "mask",
      "water bottles",
      "more example items",
      "more stuff to bring",
    ],
  };
  await iplocate("184.167.25.35").then(function (results) {
    protest.location = results;
  });
  res.send(protest);
});

module.exports = router;
