const mongoose = require("mongoose");

const CoachComparisonSchema = new mongoose.Schema({
  division: { type: String, required: true },
  comparisons: [
    {
      coach1: { type: String, required: true },
      coach2: { type: String, required: true },
      criteria: {
        Experience: { type: Number, required: true },
        Achievement: { type: Number, required: true },
        Price: { type: Number, required: true },
        Availability: { type: Number, required: true },
      },
    },
  ],
});

module.exports = mongoose.model("CoachComparison", CoachComparisonSchema);
