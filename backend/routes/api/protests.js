const router = require("express").Router();
const iplocate = require("node-iplocate");

//  Route - /api/protests
router.route("/").get((req, res) => {
  res.send("test");
});

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
