const express = require("express");
const {
  getAllComparisons,
  addComparison,
} = require("../controllers/perbandinganController");

const router = express.Router();

// ✅ GET semua perbandingan pelatih
router.get("/", getAllComparisons);

// ✅ POST tambah perbandingan pelatih
router.post("/", addComparison);

module.exports = router;
