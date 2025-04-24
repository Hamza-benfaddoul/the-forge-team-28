"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PersonIcon } from "@radix-ui/react-icons";

interface HeaderProps {
  showAvatar?: boolean;
}

export default function Header({ showAvatar = false }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    // In a real app, this would navigate to a login page
    // For demo purposes, we'll just toggle the login state
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="AgriMarket Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-green-700">AgriMarket</span>
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-700 md:inline-block">
              John Doe
            </span>
            <div className="relative">
              <button className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-green-100 text-green-800 ring-2 ring-green-600">
                {showAvatar ? (
                  <Image
                    src="/placeholder.svg?height=36&width=36"
                    alt="User Avatar"
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <PersonIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleLoginClick}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
