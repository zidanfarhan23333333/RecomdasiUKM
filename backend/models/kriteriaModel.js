const mongoose = require("mongoose");

const CriteriaWeightSchema = new mongoose.Schema({
  criteria: { type: String, required: true }, // Nama kriteria (Experience, Achievement, dll.)
  weight: { type: Number, required: true }, // Bobot dari metode ROC
});

module.exports = mongoose.model("CriteriaWeight", CriteriaWeightSchema);
