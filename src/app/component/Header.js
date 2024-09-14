"use client"; // Ensure this file is treated as a client-side component
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import Logos from '../../public/images/logo.png';
import hotelsData from '../../public/json/data.json'; // Adjust the path to your JSON data

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(null);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Initialize the data from JSON
    setData(hotelsData.categories);
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
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center py-4 px-6">
        {/* Logo */}
        <div className="flex-shrink-0 mb-4 md:mb-0">
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
        
        {/* Navigation */}
        <nav className="flex-1 flex items-center justify-center md:justify-between space-x-6">
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('hotels')}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              Hotels
            </button>
            {isDropdownOpen === 'hotels' && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg border">
                {data.find(category => category.category === 'Hotels')?.items.slice(0, 5).map((item) => (
                  <Link key={item.id} href={`/hotels/${item.id}`} className="block px-4 py-2 text-gray-600 hover:bg-gray-200">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('colleges')}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              Colleges
            </button>
            {isDropdownOpen === 'colleges' && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg border">
                {data.find(category => category.category === 'Colleges')?.items.slice(0, 5).map((item) => (
                  <Link key={item.id} href={`/colleges/${item.id}`} className="block px-4 py-2 text-gray-600 hover:bg-gray-200">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('clubs')}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              Clubs
            </button>
            {isDropdownOpen === 'clubs' && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg border">
                {data.find(category => category.category === 'Clubs')?.items.slice(0, 5).map((item) => (
                  <Link key={item.id} href={`/clubs/${item.id}`} className="block px-4 py-2 text-gray-600 hover:bg-gray-200">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('tourist')}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              Tourist Places
            </button>
            {isDropdownOpen === 'tourist' && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg border">
                {data.find(category => category.category === 'Tourist Places')?.items.slice(0, 5).map((item) => (
                  <Link key={item.id} href={`/tourist-places/${item.id}`} className="block px-4 py-2 text-gray-600 hover:bg-gray-200">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden mt-4">
          <button className="text-gray-600 hover:text-blue-600 focus:outline-none">
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
      </div>
    </header>
  );
}
