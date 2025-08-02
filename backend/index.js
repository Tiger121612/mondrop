const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MonDrop Backend is running.");
});

app.post("/check-eligibility", async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  // 🔄 Dummy eligibility logic for testing
  let isEligible = address.endsWith("5") || address.endsWith("F");
  let score = isEligible ? 87 : 43;

  let tier = "Bronze";
  if (score > 80) tier = "OG";
  else if (score > 60) tier = "Pro";
  else if (score > 45) tier = "Builder";

  // 📝 Reason or breakdown
  const reason = isEligible
    ? "You are eligible due to early use and active dApp engagement."
    : "You are not eligible due to low activity, fewer dApps, or suspicious patterns.";

  res.json({
    address,
    isEligible,
    score,
    tier,
    reason,
  });
});

// 🧾 Generate PDF Report
app.post("/generate-pdf", (req, res) => {
  const { address, score, tier, reason } = req.body;

  const doc = new PDFDocument();
  const filename = `mondrop-${address}.pdf`;
  res.setHeader("Content-disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-type", "application/pdf");

  doc.fontSize(18).text("MonDrop Airdrop Eligibility Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Wallet Address: ${address}`);
  doc.text(`Score: ${score}%`);
  doc.text(`Tier: ${tier}`);
  doc.moveDown();
  doc.fontSize(12).text(`Reason: ${reason}`);
  doc.end();
  doc.pipe(res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
