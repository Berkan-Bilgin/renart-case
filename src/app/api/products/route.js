import { NextResponse } from "next/server";
import { products } from "@/data/productsData";
import { getGoldPriceUSDGram } from "@/services/goldApiService";
import { calculatePrice } from "@/services/productService";
import { convertPopularityScoreTo5 } from "@/helpers/convertPopularityScoreTo5";
import { filterProducts } from "@/helpers/filterProducts";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(
      searchParams.get("maxPrice") || Number.MAX_VALUE.toString()
    );
    const minPopularity = parseFloat(searchParams.get("minPopularity") || "0");
    const maxPopularity = parseFloat(searchParams.get("maxPopularity") || "5");

    const goldPrice = await getGoldPriceUSDGram();

    // Enrich
    const enrichedProducts = products.map((product) => {
      const price = calculatePrice(
        product.popularityScore,
        product.weight,
        goldPrice
      );
      const popularityOutOfFive = convertPopularityScoreTo5(
        product.popularityScore
      );

      return {
        ...product,
        price: price, // Number olarak tutuyoruz
        popularityOutOfFive,
      };
    });

    // Filtre
    const filteredProducts = filterProducts(enrichedProducts, {
      minPrice,
      maxPrice,
      minPopularity,
      maxPopularity,
    });

    // Son adım: İstersen price'ı string olarak döndür (ör: "1234.56")
    const finalProducts = filteredProducts.map((p) => ({
      ...p,
      price: p.price.toFixed(2),
    }));

    return NextResponse.json(finalProducts);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
