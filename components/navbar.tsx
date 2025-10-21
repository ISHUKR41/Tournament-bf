"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Gamepad2, Zap, Shield } from "lucide-react";
import { cn } from "../lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Trophy },
    { href: "/pubg", label: "PUBG Mobile", icon: Gamepad2 },
    { href: "/freefire", label: "Free Fire", icon: Zap },
    { href: "/admin", label: "Admin", icon: Shield },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="w-8 h-8 text-orange-500" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text hidden sm:inline">
              Tournament Hub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg transition-all duration-200",
                    "flex items-center gap-2 text-sm font-medium",
                    isActive
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
