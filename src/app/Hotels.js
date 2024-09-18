import { useRouter } from 'next/router';
import hotelsData from '../../json/data.json'; // Assuming your JSON data is stored here
import Image from 'next/image';

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  
  const categoryData = hotelsData.categories.find(cat => cat.category === 'Hotels');

  if (!categoryData) {
    return <p>Category not found</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">{category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryData.items.map(item => (
          <div key={item.id} className="relative group overflow-hidden border rounded-lg shadow-lg p-4 max-w-xs">
            <div className="w-full h-48 overflow-hidden rounded-lg">
              <Image
                src={item.image} // Ensure correct path for image
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500 mt-2">{item.description}</p>
              <p className="text-gray-600 mt-2 font-bold">{item.price_per_night}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
