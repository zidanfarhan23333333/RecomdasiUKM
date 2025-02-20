const CoachComparison = require("../models/nilaiModel");

exports.getAllComaprisons = async (req, res) => {
  try {
    const comparisons = await CoachComparison.find();
    res.json(comparisons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Tambah perbandingan pelatih
exports.addComparison = async (req, res) => {
  const { division, comparisons } = req.body;
  try {
    const newComparison = new CoachComparison({ division, comparisons });
    await newComparison.save();
    res.status(201).json(newComparison);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
