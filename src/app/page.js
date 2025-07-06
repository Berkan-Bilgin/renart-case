import ProductCarousel from "@/components/ProductCarousel";

export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-[45px] font-avenir font-light text-center mb-6">
        Product List
      </h1>
      <ProductCarousel products={products} />
    </main>
  );
}
