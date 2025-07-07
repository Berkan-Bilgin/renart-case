export function filterProducts(products, filters) {
  let {
    minPrice = 0,
    maxPrice = Number.MAX_VALUE,
    minPopularity = 0,
    maxPopularity = 5,
  } = filters;

  // NaN veya boş kontrol
  minPrice = Number(minPrice);
  maxPrice = Number(maxPrice);
  minPopularity = Number(minPopularity);
  maxPopularity = Number(maxPopularity);

  // Eğer sayı değilse veya negatifse düzelt
  minPrice = isNaN(minPrice) ? 0 : Math.max(0, minPrice);
  maxPrice = isNaN(maxPrice) ? Number.MAX_VALUE : Math.max(0, maxPrice);
  minPopularity = isNaN(minPopularity) ? 0 : Math.max(0, minPopularity);
  maxPopularity = isNaN(maxPopularity) ? 5 : Math.min(5, maxPopularity);

  // maxPrice mantıklı sınır
  if (maxPrice > 1_000_000) {
    maxPrice = 1_000_000;
  }

  // Swap kontrolleri
  if (minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  if (minPopularity > maxPopularity) {
    [minPopularity, maxPopularity] = [maxPopularity, minPopularity];
  }

  return products.filter((product) => {
    const priceCondition =
      product.price >= minPrice && product.price <= maxPrice;
    const popularityCondition =
      product.popularityOutOfFive >= minPopularity &&
      product.popularityOutOfFive <= maxPopularity;
    return priceCondition && popularityCondition;
  });
}
