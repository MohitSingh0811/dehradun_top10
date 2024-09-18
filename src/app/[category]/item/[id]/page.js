import hotelsData from "../../../json/data.json"; // Adjust path accordingly

export default function ItemPage({ params }) {
  const { category, id } = params;

  // Find the category data based on the dynamic segment
  const categoryData = hotelsData.categories.find(cat => cat.category === category);

  if (!categoryData) {
    return <div className="p-8 bg-white text-gray-600">Category not found</div>;
  }

  // Find the item within the selected category
  const item = categoryData.items.find(item => item.id === parseInt(id));

  if (!item) {
    return <div className="p-8 bg-white text-gray-600">Item not found</div>;
  }

  return (
    <div className="p-8 bg-white text-gray-600">
      <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Item Image */}
        <div className="w-full sm:w-1/2">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Item Details */}
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <p className="text-lg">{item.description}</p>
          <p className="text-lg font-bold">Price Per Night: {item.price_per_night}</p>
        </div>
      </div>
    </div>
  );
}
