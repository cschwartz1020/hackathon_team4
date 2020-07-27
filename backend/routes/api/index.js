const router = require("express").Router();
const protestRoutes = require("./protests");

router.use("/protests", protestRoutes);

module.exports = router;
