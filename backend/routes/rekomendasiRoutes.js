const express = require("express");
const router = express.Router();
const rekomendasiController = require("../controllers/rekomendasiController");

router.get("/roc", rekomendasiController.calculateRoc);
router.post("/ahp", rekomendasiController.calculateAHP);

module.exports = router;
