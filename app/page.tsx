"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/data";
import Header from "@/components/header";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build the query string
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (location) params.append("location", location);

    // Navigate to search page with query parameters
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-5xl">
                What do you want to buy?
              </h1>
              <div className="mx-auto max-w-2xl">
                <form
                  onSubmit={handleSearch}
                  className="flex flex-col gap-4 md:flex-row"
                >
                  <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for products..."
                      className="h-12 w-full rounded-md border border-gray-300 pl-10 pr-4 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 md:max-w-[200px]">
                    <select
                      className="h-12 w-full rounded-md border border-gray-300 px-4 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">Select Location</option>
                      <option value="north">North Region</option>
                      <option value="south">South Region</option>
                      <option value="east">East Region</option>
                      <option value="west">West Region</option>
                      <option value="central">Central Region</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="h-12 rounded-md bg-green-600 px-6 font-medium text-white hover:bg-green-700"
                  >
                    Get Best Price
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">
              Highlights
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
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
