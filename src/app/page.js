import ProductCarousel from "@/components/ProductCarousel";
import FilterSidebar from "@/components/FilterSidebar";

export default async function HomePage({ searchParams }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const minPrice = searchParams.minPrice ?? "0";
  const maxPrice = searchParams.maxPrice ?? "100000";
  const minPopularity = searchParams.minPopularity ?? "0";
  const maxPopularity = searchParams.maxPopularity ?? "5";

  const res = await fetch(
    `${baseUrl}/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}&minPopularity=${minPopularity}&maxPopularity=${maxPopularity}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <main className="p-4 md:p-8 relative">
      <div className="flex justify-end mb-4">
        <FilterSidebar />
      </div>

      <ProductCarousel products={products} />
    </main>
  );
}
