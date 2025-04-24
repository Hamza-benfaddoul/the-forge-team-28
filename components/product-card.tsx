"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsClicked(true);
    // Reset the click state after the animation completes
    setTimeout(() => setIsClicked(false), 300);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the Link component's default navigation
    setIsClicked(true);

    // Navigate to product detail page after a short delay for the animation
    setTimeout(() => {
      // Navigate to the product detail page
      router.push(`/product/${product.id}`);
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  return (
    <Link href={`/product/${product.id}`} onClick={handleClick}>
      <div
        className={`group overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 ${
          isClicked ? "scale-95 shadow-inner bg-green-50" : "hover:shadow-md"
        }`}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={200}
            className={`h-full w-full object-cover transition-transform duration-300 ${
              isClicked ? "scale-95" : "group-hover:scale-105"
            }`}
          />
          {product.isOrganic && (
            <div className="absolute left-2 top-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              Organic
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="mb-1 text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <div className="mb-2 flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{product.region}</span>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-lg font-bold text-green-700">
              ${product.price.toFixed(2)}/kg
            </span>
            <span className="text-sm text-gray-600">
              {product.quantity} kg available
            </span>
          </div>
          <button
            onClick={handleViewDetails}
            className={`w-full rounded-md border border-green-600 py-1.5 text-sm font-medium transition-colors ${
              isClicked
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 hover:bg-green-50"
            }`}
          >
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
