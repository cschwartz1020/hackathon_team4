const router = require("express").Router();
const protestRoutes = require("./protests/protests");
const covidRoutes = require("./covid/covid");
const articleRoutes = require("./article/article");

router.use("/covid", covidRoutes);
router.use("/protests", protestRoutes);
router.use("/article", articleRoutes);

module.exports = router;
