import { tierImages } from './tiers.js';

const addressInput = document.getElementById("walletAddress");
const checkBtn = document.getElementById("checkBtn");
const resultBox = document.getElementById("result");

checkBtn.addEventListener("click", async () => {
  const address = addressInput.value.trim();

  if (!address) {
    alert("Please enter a wallet address.");
    return;
  }

  try {
    const response = await fetch("https://mondrop.onrender.com/check-eligibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });

    const data = await response.json();
    showResult(data);
  } catch (err) {
    alert("Error checking eligibility. Try again later.");
  }
});

function showResult(data) {
  resultBox.innerHTML = `
    <h3>Result for ${data.address}</h3>
    <p><strong>Score:</strong> ${data.score}%</p>
    <p class="tier"><strong>Tier:</strong> ${data.tier}</p>
    <p><strong>Reason:</strong> ${data.reason}</p>
    <img src="${tierImages[data.tier] || tierImages['NotEligible']}" width="200" style="margin-top: 20px; border-radius: 12px;">
    <br/><br/>
    <button onclick="downloadPDF('${data.address}', ${data.score}, '${data.tier}', '${data.reason}')">📄 Download PDF</button>
  `;
}

window.downloadPDF = async (address, score, tier, reason) => {
  const response = await fetch("https://mondrop.onrender.com/generate-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, score, tier, reason }),
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `mondrop-${address}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};
