"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState("yellow");

  const colorNames = {
    yellow: "Yellow Gold",
    rose: "Rose Gold",
    white: "White Gold",
  };

  const colors = Object.keys(product.images);

  return (
    <div className="p-3 flex flex-col items-start bg-white rounded ">
      <div className="relative w-full aspect-square mb-2">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover rounded"
        />
      </div>
      <h2 className="text-lg font-montserrat font-semibold mt-2 text-center">
        {product.name}
      </h2>
      <p className="text-gray-600 font-montserrat mb-1">${product.price} USD</p>

      <div className="flex space-x-2 mb-1">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-6 h-6 rounded-full border ${getColorClass(color)} ${
              selectedColor === color ? "border-black " : "border-gray-300"
            } mx-1 `}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 mb-2 font-avenir">
        {colorNames[selectedColor]}
      </p>

      <Stars score={parseFloat(product.popularityOutOfFive)} />
    </div>
  );
}

function Stars({ score }) {
  const rounded = Math.round(score);
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rounded ? "text-yellow-gold" : "text-gray-400"}
          stroke="currentColor"
          fill={i < rounded ? "currentColor" : "none"}
        />
      ))}
      <span className="text-sm font-avenir text-gray-600">{score}/5</span>
    </div>
  );
}

function getColorClass(color) {
  switch (color) {
    case "yellow":
      return "bg-yellow-gold";
    case "rose":
      return "bg-rose-gold";
    case "white":
      return "bg-white-gold";
    default:
      return "bg-gray-300";
  }
}
