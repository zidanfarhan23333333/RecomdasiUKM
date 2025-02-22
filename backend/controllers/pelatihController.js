const Coach = require("../models/pelatihModel");

// ✅ Ambil semua pelatih
exports.getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Ambil pelatih berdasarkan ID
exports.getCoachById = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach)
      return res.status(404).json({ message: "Pelatih tidak ditemukan" });
    res.json(coach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Tambah pelatih baru
exports.addCoach = async (req, res) => {
  const { name, division, experience, achievement, price, availability } =
    req.body;
  try {
    const newCoach = new Coach({
      name,
      division,
      experience,
      achievement,
      price,
      availability,
    });
    await newCoach.save();
    res.status(201).json(newCoach);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Update pelatih
exports.updateCoach = async (req, res) => {
  try {
    const updatedCoach = await Coach.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCoach)
      return res.status(404).json({ message: "Pelatih tidak ditemukan" });
    res.json(updatedCoach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Hapus pelatih
exports.deleteCoach = async (req, res) => {
  try {
    const deletedCoach = await Coach.findByIdAndDelete(req.params.id);
    if (!deletedCoach)
      return res.status(404).json({ message: "Pelatih tidak ditemukan" });
    res.json({ message: "Pelatih berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
