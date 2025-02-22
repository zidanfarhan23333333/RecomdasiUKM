const Coach = require("../models/pelatihModel");
const CriteriaWeight = require("../models/kriteriaModel");
const CoachComparison = require("../models/nilaiModel");

// Perhitungan Roc untuk bobot Kriteria
exports.calculateRoc = async (req, res) => {
  try {
    const criteria = ["Experience", "Achievement", "Price", "Availability"];
    const n = criteria.length;
    let weights = {};

    criteria.forEach((criterion, i) => {
      let weight = 0;
      for (let j = i + 1; j <= n; j++) {
        weight += 1 / j;
      }
      weights[criterion] = weight / n;
    });

    for (const [criterion, weight] of Object.entries(weights)) {
      await CriteriaWeight.updateOne(
        { criteria: criterion },
        { weight: weight },
        { upsert: true }
      );
    }

    res.json(weights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Perhitungan AHP untuk Menentukan Pelatih Terbaik
exports.calculateAHP = async (req, res) => {
  try {
    const { division } = req.body;
    const comparisons = await CoachComparison.find({ division });
    if (!comparisons)
      return res.status(404).json({ message: "Tidak ditemukan" });

    let criteriaSum = {
      Experience: 0,
      Achievement: 0,
      Price: 0,
      Availability: 0,
    };

    comparisons.comparisons.forEach((comp) => {
      Object.keys(comp).forEach((criterion) => {
        criteriaSum[criterion] += comp[criterion];
      });
    });

    let normalized = {};
    Object.keys(criteriaSum).forEach((criterion) => {
      normalized[criterion] = criteriaSum[criterion] / comparisons.length;
    });

    res.json(normalized);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
