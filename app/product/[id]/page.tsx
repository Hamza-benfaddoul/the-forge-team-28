"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Truck, MapPin } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/product-card";
import QuantitySelector from "@/components/quantity-selector";
import OfferModal from "@/components/offer-modal";
import Header from "@/components/header";
import { ChevronRightIcon, CalendarIcon } from "@radix-ui/react-icons";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [showOfferModal, setShowOfferModal] = useState(false);

  // Find the product by ID
  const product = products.find((p) => p.id === params.id) || products[0];

  // Get related products (excluding the current one)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Header showAvatar={true} />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
            <ChevronRightIcon className="mx-2 h-4 w-4" />
            <Link href="/search" className="hover:text-green-600">
              Products
            </Link>
            <ChevronRightIcon className="mx-2 h-4 w-4" />
            <span className="text-gray-900">{product.name}</span>
          </nav>

          {/* Product Details */}
          <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Product Gallery */}
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg border bg-white">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="h-[400px] w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-md border bg-white"
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        width={150}
                        height={150}
                        className="h-20 w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {product.name}
                  </h1>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(24 reviews)</span>
                  </div>
                </div>

                <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-700">
                      Price
                    </span>
                    <span className="text-2xl font-bold text-green-700">
                      ${product.price.toFixed(2)}/kg
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span>Free delivery on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 text-green-600" />
                    <span>Available for immediate delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>From {product.region}</span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    Quantity Available
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {product.quantity} kg
                    </span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      In Stock
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    Select Quantity
                  </h3>
                  <QuantitySelector maxQuantity={product.quantity} />
                </div>

                <button
                  className="w-full rounded-md bg-green-600 py-3 text-center font-medium text-white hover:bg-green-700"
                  onClick={() => setShowOfferModal(true)}
                >
                  Make an Offer
                </button>
              </div>
            </div>

            {/* Product Description */}
            <div className="mt-12">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Product Description
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>{product.description}</p>
                <p>
                  Our {product.name} is sourced directly from local farmers in
                  the {product.region} region. We ensure that all our products
                  are fresh, organic, and of the highest quality. By purchasing
                  from us, you're supporting local agriculture and sustainable
                  farming practices.
                </p>
                <h3>Farm Information</h3>
                <p>
                  Grown at Green Valley Farms, a family-owned operation with
                  over 30 years of experience in sustainable agriculture. Their
                  farming practices focus on soil health, water conservation,
                  and minimal use of pesticides.
                </p>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mt-12">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Customer Feedback
              </h2>
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="rounded-lg border bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${
                              j < 4
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        John Doe
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Great quality product! The produce was fresh and delivered
                      on time. Will definitely order again.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
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

      {/* Offer Modal */}
      <OfferModal
        isOpen={showOfferModal}
        onClose={() => setShowOfferModal(false)}
        productName={product.name}
        productPrice={product.price}
      />
    </div>
  );
}
