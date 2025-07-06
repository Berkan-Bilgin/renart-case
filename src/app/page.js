import ProductCarousel from "@/components/ProductCarousel";

export default async function HomePage() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  const products = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-[45px] font-avenir font-light  text-center  mb-6">
        Product List
      </h1>
      <ProductCarousel products={products} />
    </main>
  );
}
