export async function getGoldPrice() {
  // You can use the real API here
  // const res = await fetch("https://www.goldapi.io/api/XAU/USD", {
  //   headers: { "x-access-token": process.env.GOLD_API_KEY }
  // });
  // const data = await res.json();
  // return data.price_gram_24k;

  // TODO: Replace the hardcoded value with the real API response in production.
  // Consider using an environment variable or configuration to switch between mock and real data.
  return 70; // Mocked gold price in USD per gram
}
