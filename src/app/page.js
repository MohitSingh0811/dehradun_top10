"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import hotelsData from "./json/data.json";

export default function Home() {
  const [data, setData] = useState([]);
  const [visibleItems, setVisibleItems] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setData(hotelsData.categories);
    
    const initialVisibleItems = {};
    hotelsData.categories.forEach(category => {
      initialVisibleItems[category.category] = 3; 
    });
    setVisibleItems(initialVisibleItems);

    const intervalId = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % hotelsData.categories.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white text-black">
      <section className="relative w-full h-80 bg-gray-900 text-white overflow-hidden rounded-lg shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full relative">
            {data.length > 0 && (
              <Image
                src={data[currentSlide].items[0].image}
                alt={data[currentSlide].items[0].name}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50">
              <h1 className="text-3xl font-bold mb-4">{data[currentSlide]?.category}</h1>
              <p className="text-lg">{data[currentSlide]?.items[0]?.description}</p>
              <p className="text-xl font-semibold mt-2">{data[currentSlide]?.items[0]?.name}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        {data.map((category) => (
          <div key={category.category} className="w-full">
            <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.slice(0, visibleItems[category.category]).map((item) => (
                <div key={item.id} className="relative group overflow-hidden border rounded-lg shadow-lg p-4 max-w-xs bg-offwhite text-black border-gray-300">
                  <div className="w-full h-48 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-700 mt-2">{item.description}</p>
                    <p className="text-black mt-2 font-bold">{item.price_per_night}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Adding margin from the cards and making the button responsive */}
            <div className="mt-6 text-center">
              <Link href={`/${category.category}`}   className="inline-block px-6 py-2 text-white bg-darkgray hover:bg-blue-600 rounded-lg transition-colors duration-200"
              >
                View All {category.category}
              </Link>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
