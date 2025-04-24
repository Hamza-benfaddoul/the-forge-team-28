"use client";

import type React from "react";
import FilterSidebar from "./filter-sidebar";
import { Cross2Icon } from "@radix-ui/react-icons";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    regions: string[];
    priceRange: { min: string; max: string };
    quantity: number;
    categories: string[];
    productTypes: string[];
    sortBy: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      regions: string[];
      priceRange: { min: string; max: string };
      quantity: number;
      categories: string[];
      productTypes: string[];
      sortBy: string;
    }>
  >;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  setFilters,
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-50 md:hidden">
      <div className="h-full w-[85%] max-w-md overflow-y-auto bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <Cross2Icon className="h-6 w-6" />
          </button>
        </div>
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <div className="mt-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-md bg-green-600 py-2 text-sm font-medium text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
