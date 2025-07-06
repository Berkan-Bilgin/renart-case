import { NextResponse } from "next/server";
import { products } from "@/data/productsData";
import { getGoldPriceUSDGram } from "@/services/goldApiService";
import { calculatePrice } from "@/services/productService";
import { convertPopularityScoreTo5 } from "@/helpers/convertPopularityScoreTo5";

export async function GET() {
  try {
    const goldPrice = await getGoldPriceUSDGram();

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
        price: price.toFixed(2),
        popularityOutOfFive,
      };
    });

    return NextResponse.json(enrichedProducts);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
