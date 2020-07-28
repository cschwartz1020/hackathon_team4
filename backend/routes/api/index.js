const router = require("express").Router();
const protestRoutes = require("./protests");
const covidRoutes = require("./covid");

router.use("/covid", covidRoutes);
router.use("/protests", protestRoutes);

module.exports = router;
