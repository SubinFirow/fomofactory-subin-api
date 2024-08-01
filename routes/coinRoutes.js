const express = require("express");
const { fetch } = require("../controllers/coinController");
const router = express.Router();

router.post("/fetch", fetch);

module.exports = router;
