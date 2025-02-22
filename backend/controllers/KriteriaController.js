const Criteria = require("../models/kriteriaModel");

// Mendapatkan semua kriteria
const getAllCriteria = async (req, res) => {
  try {
    const criteria = await Criteria.find();
    res.status(200).json(criteria);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// Menambahkan kriteria baru
const addCriteria = async (req, res) => {
  try {
    const { name, weight } = req.body;
    const newCriteria = new Criteria({ name, weight });
    await newCriteria.save();
    res.status(201).json(newCriteria);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan kriteria" });
  }
};

module.exports = { getAllCriteria, addCriteria };
