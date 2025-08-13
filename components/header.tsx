"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import { SearchDialog } from "@/components/search-dialog"
import { useRegion } from "@/components/region-context"
import { navigationMenus } from "@/lib/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { region, toggleRegion } = useRegion()

  // Close dropdown when clicking outside
  const handleDropdownEnter = (menuKey: string) => {
    setActiveDropdown(menuKey)
  }

  const handleDropdownLeave = () => {
    // Add a small delay to prevent accidental closing when moving to dropdown
    setTimeout(() => {
      setActiveDropdown(null)
    }, 100)
  }

  return (
    <>
      <header className="bg-white shadow-professional border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group -ml-4 sm:-ml-6 lg:-ml-8">
              <div className="w-48 h-12 bg-[#850101] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 group-hover:bg-[#650101] p-1 ml-[-1rem]">
                <img src="/EiATSIndiaLogo.png" alt="Ei ASSET Talent Search Logo" className="w-full h-full object-contain" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {Object.entries(navigationMenus).map(([key, menu]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(key)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={menu.href}
                    className="flex items-center gap-1 text-gray-700 hover:text-[#850101] font-medium nav-hover transition-all duration-300 py-2"
                  >
                    {menu.title}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === key ? 'rotate-180' : ''
                    }`} />
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {activeDropdown === key && (
                    <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-professional-lg border border-gray-200 py-2 z-[9998] animate-fade-in-up"
                         onMouseEnter={() => handleDropdownEnter(key)}
                         onMouseLeave={handleDropdownLeave}>
                      {menu.sections.map((section, index) => (
                        section.external ? (
                          <a
                            key={index}
                            href={section.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-[#850101] hover:bg-gray-50 transition-all duration-200"
                          >
                            {section.name}
                          </a>
                        ) : (
                          <Link
                            key={index}
                            href={section.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-[#850101] hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {section.name}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search and Register Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-[#850101] transition-all duration-300 rounded-lg hover:bg-gray-100 icon-hover-bounce focus-ring"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <Button
                asChild
                className="bg-[#850101] hover:bg-[#650101] text-white btn-hover-lift btn-hover-glow transition-all duration-300"
              >
                <a href="https://ats.ei.study/ats_registration.php" target="_blank" rel="noopener noreferrer">
                  Register
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#850101] text-[#850101] hover:bg-[#850101] hover:text-white px-2 py-1 text-xs font-semibold rounded-md"
                onClick={toggleRegion}
                key={region}
              >
                {region}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-[#850101] transition-all duration-300 rounded-lg hover:bg-gray-100 icon-hover-bounce focus-ring"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                className="p-2 transition-all duration-300 rounded-lg hover:bg-gray-100 focus-ring"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
                ) : (
                  <Menu className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in-up">
              <nav className="flex flex-col space-y-4">
                {Object.entries(navigationMenus).map(([key, menu]) => (
                  <div key={key} className="space-y-2">
                    <div
                      className="text-gray-700 hover:text-[#850101] font-medium transition-all duration-300 hover:pl-2 flex items-center justify-between cursor-pointer"
                      onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                    >
                      {menu.title}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                        activeDropdown === key ? 'rotate-180' : ''
                      }`} />
                    </div>
                    
                    {/* Mobile Dropdown */}
                    {activeDropdown === key && (
                      <div className="ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
                        {menu.sections.map((section, index) => (
                          section.external ? (
                            <a
                              key={index}
                              href={section.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-sm text-gray-600 hover:text-[#850101] transition-all duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {section.name}
                            </a>
                          ) : (
                            <Link
                              key={index}
                              href={section.href}
                              className="block text-sm text-gray-600 hover:text-[#850101] transition-all duration-200 cursor-pointer"
                              onClick={() => {
                                setIsMenuOpen(false)
                                setActiveDropdown(null)
                              }}
                            >
                              {section.name}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex gap-2 mt-4">
                  <Button
                    asChild
                    className="bg-[#850101] hover:bg-[#650101] text-white flex-1 btn-hover-glow transition-all duration-300"
                  >
                    <a href="https://ats.ei.study/ats_registration.php" target="_blank" rel="noopener noreferrer">
                      Register
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#850101] text-[#850101] flex-1"
                    onClick={() => { toggleRegion(); setIsMenuOpen(false) }}
                    key={region}
                  >
                    {region}
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  )
}
