"use client"; // Ensure this file is treated as a client-side component
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import Logos from '../../../public/images/logo.png';
import hotelsData from '../json/data.json'; // Adjust the path to your JSON data

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize the data from JSON
    setCategories(hotelsData.categories);
  }, []);

  // Toggle dropdown visibility
  const handleDropdownToggle = (category) => {
    setDropdownOpen(prev => (prev === category ? null : category));
  };

  // Handle mouse enter/leave events for dropdowns
  const handleMouseEnter = (category) => {
    setDropdownOpen(category);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(null);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-300">
    <div className="container mx-auto flex items-center justify-between py-4 px-6">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image 
            src={Logos} // Path to your logo image
            alt="MyApp Logo"
            width={150} // Adjust the width of your logo
            height={100} // Adjust the height of your logo
            className=""
          />
        </Link>
      </div>
  
      {/* Dynamic Navigation */}
      <nav className="hidden md:flex flex-1 justify-center space-x-6">
        {categories.map((category) => (
          <div
            key={category.category}
            className="relative"
            onMouseEnter={() => handleMouseEnter(category.category)}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-gray-600 hover:text-blue-600 focus:outline-none">
              {category.category}
            </button>
            <div
              className={`dropdown absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg border ${
                isDropdownOpen === category.category ? 'show' : ''
              }`}
            >
              {category.items.slice(0, 5).map((item) => (
                <Link
                  key={item.id}
                  href={`/${category.category}/item/${item.id}`} // Dynamic URL based on category and item ID
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
  
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="text-gray-600 hover:text-blue-600 focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
  
      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-10">
          <div className="flex flex-col p-4">
            {categories.map((category) => (
              <div
                key={category.category}
                className="mb-2"
                onClick={() => setDropdownOpen(category.category)}
              >
                <button className="text-gray-600 hover:text-blue-600 focus:outline-none w-full text-left">
                  {category.category}
                </button>
                {isDropdownOpen === category.category && (
                  <div className="mt-2 bg-white shadow-lg rounded-lg border z-20">
                    {category.items.slice(0, 5).map((item) => (
                      <Link
                        key={item.id}
                        href={`/${category.category}/item/${item.id}`} // Dynamic URL based on category and item ID
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </div>
  
    <style jsx>{`
      .dropdown {
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        visibility: hidden;
        pointer-events: none;
        z-index: 1;
      }
  
      .dropdown.show {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
        pointer-events: auto;
        z-index: 10; /* Ensure dropdown appears above other content */
      }
  
      @media (min-width: 768px) {
        .dropdown {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
  
        .dropdown.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          z-index: 10; /* Ensure dropdown appears above other content */
        }
      }
    `}</style>
  </header>
  
  
  );
}
