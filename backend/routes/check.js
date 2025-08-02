const express = require("express");
const router = express.Router();
const getAirdropTier = require("../utils/tierLogic");

router.post("/", async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    const result = await getAirdropTier(address);

    return res.json(result);
  } catch (err) {
    console.error("Error in /check route:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
