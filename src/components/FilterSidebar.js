"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "0");
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || "10000"
  );
  const [minPopularity, setMinPopularity] = useState(
    searchParams.get("minPopularity") || "0"
  );
  const [maxPopularity, setMaxPopularity] = useState(
    searchParams.get("maxPopularity") || "5"
  );

  const [isPending, startTransition] = useTransition();

  // Tüm validasyon kontrolleri
  useEffect(() => {
    let minP = Number(minPrice);
    let maxP = Number(maxPrice);
    let minPop = Number(minPopularity);
    let maxPop = Number(maxPopularity);

    if (isNaN(minP) || minP < 0) minP = 0;
    if (isNaN(maxP) || maxP < 0) maxP = 0;
    if (isNaN(minPop) || minPop < 0) minPop = 0;
    if (isNaN(maxPop) || maxPop < 0) maxPop = 0;

    if (maxP > 1_000_000) maxP = 1_000_000;
    if (maxPop > 5) maxPop = 5;

    if (minP > maxP) [minP, maxP] = [maxP, minP];
    if (minPop > maxPop) [minPop, maxPop] = [maxPop, minPop];

    setMinPrice(minP.toString());
    setMaxPrice(maxP.toString());
    setMinPopularity(minPop.toString());
    setMaxPopularity(maxPop.toString());

    const params = new URLSearchParams();
    params.set("minPrice", minP.toString());
    params.set("maxPrice", maxP.toString());
    params.set("minPopularity", minPop.toString());
    params.set("maxPopularity", maxPop.toString());

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }, [
    minPrice,
    maxPrice,
    minPopularity,
    maxPopularity,
    router,
    startTransition,
  ]);

  const handleReset = () => {
    setMinPrice("0");
    setMaxPrice("10000");
    setMinPopularity("0");
    setMaxPopularity("5");
    router.push("/");
  };

  return (
    <form className="p-4 border rounded-md shadow w-60 max-w-screen-xl mx-auto">
      <h3 className="font-semibold text-lg mb-2">Fiyat Aralığı</h3>

      <div className="flex items-center mb-3 gap-2">
        <input
          type="number"
          value={minPrice}
          min={0}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full border px-2 py-1"
          placeholder="Min"
        />
        <span>-</span>
        <input
          type="number"
          value={maxPrice}
          min={0}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full border px-2 py-1"
          placeholder="Max"
        />
      </div>

      <h3 className="font-semibold text-lg mb-2 mt-4">Ürün Puanı</h3>

      <div className="flex items-center mb-4 gap-2">
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={minPopularity}
          onChange={(e) => setMinPopularity(e.target.value)}
          className="w-full border px-2 py-1"
          placeholder="Min Puan"
        />
        <span>-</span>
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={maxPopularity}
          onChange={(e) => setMaxPopularity(e.target.value)}
          className="w-full border px-2 py-1"
          placeholder="Max Puan"
        />
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
      >
        Sıfırla
      </button>

      {isPending && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Filtreleniyor...
        </p>
      )}
    </form>
  );
}
