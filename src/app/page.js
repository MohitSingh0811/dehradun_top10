"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import hotelsData from "../public/json/data.json"; // Path to your JSON data

export default function Home() {
  const [data, setData] = useState([]);
  const [visibleItems, setVisibleItems] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    // Set data from JSON
    setData(hotelsData.categories);
    
    // Initialize visible items state
    const initialVisibleItems = {};
    hotelsData.categories.forEach(category => {
      initialVisibleItems[category.category] = 3; // Show 3 items initially
    });
    setVisibleItems(initialVisibleItems);

    // Set up slide interval
    const intervalId = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % hotelsData.categories.length);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleViewAll = (category) => {
    // Show all items for the selected category
    setVisibleItems(prev => ({
      ...prev,
      [category]: data.find(cat => cat.category === category)?.items.length || 0
    }));
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Hero Banner */}
      <section className="relative w-full h-80 bg-gray-900 text-white overflow-hidden rounded-lg shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full relative">
            {data.length > 0 && (
              <Image
                src={data[currentSlide].items[0].image} // First item of the current slide's category
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

      {/* Categories */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        {data.map((category) => (
          <div key={category.category} className="w-full">
            <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.slice(0, visibleItems[category.category]).map((item) => (
                <div key={item.id} className="relative group overflow-hidden border rounded-lg shadow-lg p-4 max-w-xs">
                  {/* Item Image */}
                  <div className="w-full h-48 overflow-hidden rounded-lg">
                    
                    <Image
                      src={item.image} // Use correct path based on your setup
                      alt={item.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500 mt-2">{item.description}</p>
                    <p className="text-gray-600 mt-2 font-bold">{item.price_per_night}</p>
                  </div>
                </div>
              ))}
            </div>
            {visibleItems[category.category] < category.items.length && (
              <button
                onClick={() => handleViewAll(category.category)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                View All
              </button>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
