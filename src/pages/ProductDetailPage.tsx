
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getProduct } from "@/lib/api";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProduct(parseInt(id));
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to your cart`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 animate-pulse">
            <div className="md:w-1/2 bg-gray-300 h-96 rounded-lg"></div>
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-8"></div>
              <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <div className="mb-8 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{product.title}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-lg shadow-md flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="max-h-[400px] object-contain"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating.rate) ? "fill-current" : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              
              <p className="text-3xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Category</h3>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
                  {product.category}
                </span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1 flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
              
              <div className="flex items-center text-green-600 mb-8">
                <Check className="h-5 w-5 mr-2" />
                <span>In stock and ready to ship</span>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Shipping & Returns</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Free shipping on all orders over $50</li>
                  <li>30-day easy returns</li>
                  <li>Satisfaction guaranteed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
