import Link from "next/link";
import Image from "next/image";
import hotelsData from "../json/data.json"; // Adjust the path if necessary

export default function CategoryPage({ params }) {
  const { category } = params;

  // Find the category data based on the dynamic segment
  const categoryData = hotelsData.categories.find(cat => cat.category === category);

  if (!categoryData) {
    return <div className="bg-white p-8">Category not found</div>;
  }

  return (
    <div className="bg-white p-8">
      <h1 className="text-black font-bold mb-4">{categoryData.category.toUpperCase()}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryData.items.map((item) => (
          <Link href={`/${category}/item/${item.id}`} key={item.id} className="group">
            <div className="relative overflow-hidden border rounded-lg shadow-lg p-4 max-w-xs cursor-pointer bg-white">
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
                <h3 className="text-gray-500 lg font-bold">{item.name}</h3>
                <p className="text-gray-500 mt-2">{item.description}</p>
                <p className="text-gray-600 mt-2 font-bold">{item.price_per_night}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
