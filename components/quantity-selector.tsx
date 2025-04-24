"use client";

import type React from "react";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

interface QuantitySelectorProps {
  maxQuantity: number;
}

export default function QuantitySelector({
  maxQuantity,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity(value);
    }
  };

  const percentage = (quantity / maxQuantity) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <button
          onClick={decrement}
          className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
          disabled={quantity <= 1}
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleChange}
          min="1"
          max={maxQuantity}
          className="h-10 w-20 border-y border-gray-300 bg-white px-3 text-center text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
        />
        <button
          onClick={increment}
          className="flex h-10 w-10 items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
          disabled={quantity >= maxQuantity}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
        <span className="ml-3 text-sm text-gray-600">kg</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span>0 kg</span>
          <span>{maxQuantity} kg</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-green-600"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-600">
          Selected: <span className="font-medium">{quantity} kg</span> of{" "}
          {maxQuantity} kg available
        </div>
      </div>
    </div>
  );
}
