"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel({ products }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    watchResize: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onResize = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("resize", onResize);
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    return () => {
      emblaApi.off("resize", onResize);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative px-6 md:px-12 xl:px-24 max-w-screen-xl mx-auto">
      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-[40%] -translate-y-1/2 z-10  p-2  "
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-[40%] -translate-y-1/2 z-10   p-2 "
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Carousel */}
      <div className="overflow-hidden " ref={emblaRef}>
        <div className="flex">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex-[0_0_100%] 
                            sm:flex-[0_0_50%] 
                            md:flex-[0_0_50%] 
                            lg:flex-[0_0_33.3333%] 
                            xl:flex-[0_0_33.333%] 
                            2xl:flex-[0_0_25%]
                            sm:px-4
                            md:px-6 
                            lg:px-6
                            xl:px-6
                           
                          
                        "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full ${
              index === selectedIndex ? "bg-gray-800" : "bg-gray-300"
            } transition`}
          />
        ))}
      </div>
    </div>
  );
}
