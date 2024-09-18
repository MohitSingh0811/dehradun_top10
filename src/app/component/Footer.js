// components/Footer.js
"use client"; // Ensure this file is treated as a client-side component
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logos from '../../../public/images/logo.png';
import Image from 'next/image'; // Import Next.js Image component
import hotelsData from '../json/data.json'; // Adjust the path to your JSON data

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize the data from JSON
    setCategories(hotelsData.categories);
  }, []);

  return (
    <footer className="bg-white text-black py-8 border-t border-gray-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Column 1: Company Info */}
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
          <p className="mt-4 text-gray-600">
            Welcome to the Dehradun Top 10
          </p>
        </div>
        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          {categories.map((category) => (
            <div
              key={category.category}
              className="relative"
            >
              <ul>
                <Link href={category.category}>
                  <li className="mb-2">
                    {category.category}
                  </li>
                </Link>
              </ul>
            </div>
          ))}
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" className="text-gray-600 hover:text-black">
              <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.992 4.388 10.967 10.125 11.854v-8.385H7.078v-3.47h3.047v-2.64c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.687.235 2.687.235v2.963h-1.514c-1.492 0-1.957.928-1.957 1.878v2.233h3.328l-.532 3.47h-2.796v8.385C19.613 23.04 24 18.065 24 12.073z" />
              </svg>
            </Link>
            <Link href="https://twitter.com" className="text-gray-600 hover:text-black">
              <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 4.557a9.927 9.927 0 01-2.828.775 4.958 4.958 0 002.165-2.724 9.91 9.91 0 01-3.127 1.195A4.924 4.924 0 0016.897 3c-2.732 0-4.946 2.215-4.946 4.947 0 .388.043.765.127 1.13A14.014 14.014 0 011.671 3.149a4.926 4.926 0 00-.668 2.484c0 1.71.87 3.216 2.188 4.099a4.92 4.92 0 01-2.241-.618v.062c0 2.385 1.696 4.374 3.946 4.828a4.933 4.933 0 01-2.237.085c.63 1.963 2.459 3.391 4.623 3.432A9.874 9.874 0 010 21.54a13.94 13.94 0 007.548 2.213c9.054 0 14.007-7.502 14.007-14.007 0-.213-.005-.426-.014-.637A10.01 10.01 0 0024 4.557z" />
              </svg>
            </Link>
            <Link href="https://linkedin.com" className="text-gray-600 hover:text-black">
              <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19.998 19.998H16.82v-5.604c0-1.335-.477-2.248-1.67-2.248-1.035 0-1.652.695-1.923 1.365-.099.241-.123.577-.123.915v5.573h-3.18s.041-9.045 0-9.982h3.18v1.413c.423-.654 1.175-1.585 2.859-1.585 2.087 0 3.65 1.365 3.65 4.296v5.858zM5.74 7.423c-1.081 0-1.787.716-1.787 1.661 0 .93.691 1.66 1.757 1.66h.02c1.1 0 1.787-.73 1.787-1.66-.02-.945-.687-1.661-1.777-1.661zm-1.592 12.575h3.18V10.016H4.148v9.982zM22.225 0H1.771C.792 0 0 .783 0 1.75v20.5C0 23.217.793 24 1.771 24h20.454C23.208 24 24 23.217 24 22.25V1.75C24 .783 23.208 0 22.225 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-500">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
      </div>
    </footer>
  );
}
