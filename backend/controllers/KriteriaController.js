const CriteriaWeight = require("../models/kriteriaModel");

// Ambil semua bobot kriteria
exports.getAllCriteriaWeights = async (req, res) => {
  try {
    const criteria = await CriteriaWeight.find();
    res.json(criteria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Tambah/ update bobot kriteria

exports.updateCriteriaWeight = async (req, res) => {
  const { criteria, weight } = req.body;
  try {
    const updateCriteria = await CriteriaWeight.findOneAndUpdate(
      { criteria },
      { weight },
      { new: true, upsert: true }
    );
    res.json(updateCriteria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
