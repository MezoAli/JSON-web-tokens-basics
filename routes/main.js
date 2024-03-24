const express = require("express");
const { dashboard, login } = require("../controllers/main");

router.post("/login", login);
router.get("/dashboard", dashboard);

const router = express.Router();

module.exports = router;
