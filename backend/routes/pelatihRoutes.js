const express = require("express");
const router = express.Router();
const pelatihController = require("../controllers/pelatihController");

// Crud
router.get("/", pelatihController.getAllCoaches);
router.get("/:id", pelatihController.getCoachById);
router.post("/", pelatihController.addCoach);
router.put("/:id", pelatihController.updateCoach);
router.delete("/:id", pelatihController.deleteCoach);

module.exports = router;
