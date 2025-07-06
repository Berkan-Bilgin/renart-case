export async function getGoldPriceUSDGram() {
  try {
    const res = await fetch(`https://api.gold-api.com/price/XAU`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!data.price || typeof data.price !== "number") {
      throw new Error("Invalid price data received");
    }

    const pricePerGram = data.price / 31.1035;
    return Math.round(pricePerGram * 100) / 100;
  } catch (error) {
    console.error("Gold price API error:", error);
    return null;
  }
}
