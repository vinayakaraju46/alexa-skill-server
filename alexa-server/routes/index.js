const router = require("express").Router();

router.use("/users", require("./users.routes"));
router.use("/devices", require("./devices.routes"));

module.exports = router;
