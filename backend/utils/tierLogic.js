// This is a mock tier detection logic.
// In real usage, connect to Monad RPC and fetch real data.

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mockCheckEligibility(address) {
  const score = getRandomInt(0, 100);
  let tier = "Bronze";

  if (score >= 80) tier = "Diamond";
  else if (score >= 60) tier = "Gold";
  else if (score >= 40) tier = "Silver";
  else if (score >= 20) tier = "Builder";

  return { score, tier };
}

async function getAirdropTier(address) {
  const result = mockCheckEligibility(address);
  return {
    address,
    tier: result.tier,
    score: result.score,
    message: `Your airdrop tier is ${result.tier}`,
  };
}

module.exports = getAirdropTier;
