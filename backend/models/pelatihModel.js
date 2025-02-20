const mongoose = require("mongoose");

const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  division: { type: String, required: true }, // Divisi olahraga
  experience: { type: Number, required: true }, // Tahun pengalaman
  achievement: { type: Number, required: true }, // Skor prestasi
  price: { type: Number, required: true }, // Harga dalam satuan tertentu
  availability: { type: Number, required: true }, // Ketersediaan waktu (skala 1-10)
});

module.exports = mongoose.model("Coach", CoachSchema);
