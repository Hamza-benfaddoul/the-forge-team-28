"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/product-card";
import { products as allProducts } from "@/lib/data";
import FilterSidebar from "@/components/filter-sidebar";
import MobileFilterDrawer from "@/components/mobile-filter-drawer";
import Header from "@/components/header";
import type { Product } from "@/lib/types";
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);
  const [filters, setFilters] = useState({
    regions: initialLocation ? [initialLocation] : ([] as string[]),
    priceRange: { min: "", max: "" },
    quantity: 0,
    categories: [] as string[],
    productTypes: [] as string[],
    sortBy: "relevance",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  // Apply filters when they change
  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.region.toLowerCase().includes(term),
      );
    }

    // Filter by regions
    if (filters.regions.length > 0) {
      filtered = filtered.filter((product) =>
        filters.regions.some((region) =>
          product.region.toLowerCase().includes(region.toLowerCase()),
        ),
      );
    }

    // Filter by price range
    if (filters.priceRange.min !== "") {
      filtered = filtered.filter(
        (product) => product.price >= Number(filters.priceRange.min),
      );
    }
    if (filters.priceRange.max !== "") {
      filtered = filtered.filter(
        (product) => product.price <= Number(filters.priceRange.max),
      );
    }

    // Filter by quantity
    if (filters.quantity > 0) {
      filtered = filtered.filter(
        (product) => product.quantity >= filters.quantity,
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category || ""),
      );
    }

    // Filter by product types (organic/conventional)
    if (filters.productTypes.length > 0) {
      filtered = filtered.filter((product) => {
        if (filters.productTypes.includes("Organic") && product.isOrganic) {
          return true;
        }
        if (
          filters.productTypes.includes("Conventional") &&
          !product.isOrganic
        ) {
          return true;
        }
        return false;
      });
    }

    // Sort products
    switch (filters.sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, you'd sort by date
        // Here we'll just reverse the array as a placeholder
        filtered.reverse();
        break;
      default:
        // Default sorting (relevance) - no change
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters]);

  // Update pagination
  useEffect(() => {
    // Calculate total pages
    const total = Math.ceil(filteredProducts.length / productsPerPage);
    setTotalPages(total || 1); // Ensure at least 1 page even if no results

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const current = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct,
    );

    setDisplayedProducts(current);
  }, [filteredProducts, currentPage, productsPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>,
    );

    // Page numbers
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page if not visible
    if (startPage > 1) {
      buttons.push(
        <button
          key="1"
          onClick={() => goToPage(1)}
          className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          1
        </button>,
      );

      // Ellipsis if needed
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 py-2 text-gray-500">
            ...
          </span>,
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            i === currentPage
              ? "bg-green-600 text-white hover:bg-green-700"
              : "border bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>,
      );
    }

    // Ellipsis if needed
    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="ellipsis2" className="px-2 py-2 text-gray-500">
          ...
        </span>,
      );
    }

    // Last page if not visible
    if (endPage < totalPages) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {totalPages}
        </button>,
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>,
    );

    return buttons;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header showAvatar={true} />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Search Results{" "}
              {filteredProducts.length > 0 && (
                <span className="text-sm font-normal text-gray-500">
                  ({filteredProducts.length} products found)
                </span>
              )}
            </h1>
            <button
              className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm md:hidden"
              onClick={() => setShowMobileFilter(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Filter Sidebar - Hidden on mobile, shown with a modal/drawer */}
            <div className="hidden w-full lg:block lg:w-64">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>

            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer
              isOpen={showMobileFilter}
              onClose={() => setShowMobileFilter(false)}
              filters={filters}
              setFilters={setFilters}
            />

            {/* Search Results */}
            <div className="flex-1">
              <div className="mb-6 rounded-md border bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for products..."
                      className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-10 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    {searchTerm && (
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={clearSearch}
                      >
                        <Cross2Icon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <select
                    className="h-10 rounded-md border border-gray-300 px-4 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 sm:w-40"
                    value={filters.sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="relevance">Sort by: Relevance</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              {displayedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex h-60 flex-col items-center justify-center rounded-lg border bg-white p-8 text-center">
                  <p className="mb-2 text-lg font-medium text-gray-900">
                    No products found
                  </p>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}

              {/* Pagination - only show if we have products */}
              {filteredProducts.length > 0 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  {renderPaginationButtons()}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold">About AgriMarket</h3>
              <p className="text-sm text-gray-600">
                Connecting farmers and buyers directly for the freshest produce
                at the best prices.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-green-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-green-600">
                    Browse Products
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-green-600">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-green-600">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
              <address className="not-italic text-sm text-gray-600">
                <p>Email: info@agrimarket.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} AgriMarket. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
