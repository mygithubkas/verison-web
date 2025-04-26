"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "Services", 
    href: "/services",
    children: [
      { name: "Custom AI Solutions", href: "/services/ai-solutions" },
      { name: "Digital Marketing", href: "/services/digital-marketing" },
      { name: "Smart Automation", href: "/services/smart-automation" },
    ]
  },
  { name: "Industries", href: "/industries" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <header className="fixed w-full z-50 bg-gradient-to-b from-slate-950/80 to-slate-950/0 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4" aria-label="Global">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              Verison
            </motion.div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:gap-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-56 rounded-md bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-slate-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="mt-4 space-y-2 pb-3">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
} 