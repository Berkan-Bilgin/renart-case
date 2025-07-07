"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, StarHalf } from "lucide-react";

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

  // Format price with dollar sign
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  // All validation checks
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
    <div className="p-6 border rounded-lg shadow-lg w-72 max-w-screen-xl mx-auto bg-white">
      <style jsx>{`
        /* Number input spinner'ları kaldır */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      <h2 className="font-bold text-xl mb-6 text-gray-800">Filters</h2>

      {/* Price Range Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          💰 Price Range
        </h3>

        <div className="flex items-center mb-3 gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={minPrice}
              min={0}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-8 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Min"
            />
          </div>
          <span className="text-gray-400 font-medium">to</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={maxPrice}
              min={0}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-8 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Max"
            />
          </div>
        </div>

        <div className="text-sm text-gray-600 mt-2">
          Range: {formatPrice(minPrice)} - {formatPrice(maxPrice)}
        </div>
      </div>

      {/* Rating Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          ⭐ Rating
        </h3>

        <div className="flex items-center mb-3 gap-2">
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={minPopularity}
            onChange={(e) => setMinPopularity(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Min Rating"
          />
          <span className="text-gray-400 font-medium">to</span>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={maxPopularity}
            onChange={(e) => setMaxPopularity(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Max Rating"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-md transition-colors duration-200 font-medium"
      >
        Reset Filters
      </button>

      {isPending && (
        <div className="flex items-center justify-center mt-4">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-sm text-gray-500">Filtering...</span>
        </div>
      )}
    </div>
  );
}
