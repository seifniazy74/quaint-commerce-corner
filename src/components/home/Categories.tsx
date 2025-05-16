
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    count: 132
  },
  {
    id: 2,
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    count: 84
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    count: 97
  },
  {
    id: 4,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    count: 53
  }
];

const Categories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our wide selection of products by category to find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/categories/${category.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md h-64">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="opacity-80">{category.count} Products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
