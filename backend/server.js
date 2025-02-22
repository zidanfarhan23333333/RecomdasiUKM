const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const pelatihRoutes = require("./routes/pelatihRoutes");
const kriteriaRoutes = require("./routes/kriteriaRoutes");
const perbandinganRoutes = require("./routes/perbandinganRoutes");
const rekomendasiRoutes = require("./routes/rekomendasiRoutes");

const app = express();

// ✅ Perbaikan: express.json() harus dipanggil sebagai fungsi
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Test API
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ Tambahkan routes
app.use("/api/coaches", pelatihRoutes);
app.use("/api/criteria", kriteriaRoutes);
app.use("/api/comparisons", perbandinganRoutes);
app.use("/api/recommendation", rekomendasiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
