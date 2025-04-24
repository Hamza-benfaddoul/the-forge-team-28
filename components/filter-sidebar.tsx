"use client";

import type React from "react";

interface FilterSidebarProps {
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

export default function FilterSidebar({
  filters,
  setFilters,
}: FilterSidebarProps) {
  // Helper function to toggle array values
  const toggleArrayValue = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter((item) => item !== value)
      : [...array, value];
  };

  // Handle region filter changes
  const handleRegionChange = (region: string) => {
    setFilters((prev) => ({
      ...prev,
      regions: toggleArrayValue(prev.regions, region),
    }));
  };

  // Handle price range changes
  const handlePriceChange = (type: "min" | "max", value: string) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value,
      },
    }));
  };

  // Handle quantity change
  const handleQuantityChange = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      quantity: value,
    }));
  };

  // Handle category filter changes
  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: toggleArrayValue(prev.categories, category),
    }));
  };

  // Handle product type filter changes
  const handleProductTypeChange = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      productTypes: toggleArrayValue(prev.productTypes, type),
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      regions: [],
      priceRange: { min: "", max: "" },
      quantity: 0,
      categories: [],
      productTypes: [],
      sortBy: "relevance",
    });
  };

  // Available regions
  const regions = ["North", "South", "East", "West", "Central"];

  // Available categories
  const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy & Eggs",
    "Specialty",
  ];

  return (
    <div className="rounded-md border bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filter By</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-green-600 hover:text-green-700 hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Region Filter */}
      <div className="border-b pb-4">
        <h3 className="mb-3 font-medium text-gray-900">Region</h3>
        <div className="space-y-2">
          {regions.map((region) => (
            <label key={region} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                checked={filters.regions.includes(region)}
                onChange={() => handleRegionChange(region)}
              />
              <span className="text-sm text-gray-700">{region}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-b py-4">
        <h3 className="mb-3 font-medium text-gray-900">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              value={filters.priceRange.min}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              min="0"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              value={filters.priceRange.max}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              min="0"
            />
          </div>
          <button
            className="w-full rounded-md border border-green-600 bg-white py-1.5 text-sm font-medium text-green-600 transition-colors hover:bg-green-50"
            onClick={() => {
              // Apply price filter - this is already handled by the useEffect in the parent
            }}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Quantity */}
      <div className="border-b py-4">
        <h3 className="mb-3 font-medium text-gray-900">Quantity (kg)</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">0 kg</span>
            <span className="text-sm text-gray-700">100+ kg</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-green-600"
          />
          <div className="text-sm text-gray-700">
            Selected: <span className="font-medium">{filters.quantity} kg</span>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="border-b py-4">
        <h3 className="mb-3 font-medium text-gray-900">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Organic Filter */}
      <div className="py-4">
        <h3 className="mb-3 font-medium text-gray-900">Product Type</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              checked={filters.productTypes.includes("Organic")}
              onChange={() => handleProductTypeChange("Organic")}
            />
            <span className="text-sm text-gray-700">Organic</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              checked={filters.productTypes.includes("Conventional")}
              onChange={() => handleProductTypeChange("Conventional")}
            />
            <span className="text-sm text-gray-700">Conventional</span>
          </label>
        </div>
      </div>

      <button
        className="mt-2 w-full rounded-md bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700"
        onClick={() => {
          // Apply all filters - this is already handled by the useEffect in the parent
        }}
      >
        Apply Filters
      </button>
    </div>
  );
}
