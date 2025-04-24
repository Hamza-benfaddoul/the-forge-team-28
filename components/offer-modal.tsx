"use client";

import type React from "react";

import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
}

export default function OfferModal({
  isOpen,
  onClose,
  productName,
  productPrice,
}: OfferModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    quantity: 1,
    offerPrice: productPrice,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone number is invalid";
    }

    if (formData.quantity < 1)
      newErrors.quantity = "Quantity must be at least 1";
    if (formData.offerPrice <= 0)
      newErrors.offerPrice = "Offer price must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds and close modal
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            quantity: 1,
            offerPrice: productPrice,
            message: "",
          });
        }, 3000);
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg md:max-w-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          disabled={isSubmitting}
        >
          <Cross2Icon className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Offer Submitted!
            </h3>
            <p className="text-gray-600">
              Thank you for your interest in {productName}. The farmer will
              contact you soon.
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-6 text-center text-xl font-bold text-gray-900">
              Make an Offer for {productName}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50`}
                  placeholder="e.g. +1 234 567 8900"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Quantity (kg)*
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.quantity ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50`}
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.quantity}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="offerPrice"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Your Offer ($ per kg)*
                  </label>
                  <input
                    type="number"
                    id="offerPrice"
                    name="offerPrice"
                    min="0.01"
                    step="0.01"
                    value={formData.offerPrice}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.offerPrice ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50`}
                  />
                  {errors.offerPrice && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.offerPrice}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  placeholder="Any special requirements or questions..."
                ></textarea>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-green-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Offer"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
