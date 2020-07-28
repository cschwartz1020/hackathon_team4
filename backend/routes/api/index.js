const router = require("express").Router();
const protestRoutes = require("./protests/protests");
const covidRoutes = require("./covid/covid");

router.use("/covid", covidRoutes);
router.use("/protests", protestRoutes);

module.exports = router;
