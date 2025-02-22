const express = require("express");
const {
  getAllCriteria,
  addCriteria,
} = require("../controllers/kriteriaController");

const router = express.Router();

// GET semua kriteria
router.get("/", getAllCriteria);

// POST tambah kriteria baru
router.post("/", addCriteria);

module.exports = router;
