const express = require("express");
const router = express.Router();

const v1Routes = require("./api/routes");

router.use("/api", v1Routes);

module.exports = router;
