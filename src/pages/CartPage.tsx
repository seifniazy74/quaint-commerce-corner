
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart, CartItem } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus, ShoppingBag } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  
  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;
  
  const handleRemoveItem = (id: number, title: string) => {
    removeItem(id);
    toast.success(`${title} removed from cart`);
  };
  
  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          
          {items.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left py-4 px-6">Product</th>
                          <th className="text-center py-4 px-6">Quantity</th>
                          <th className="text-right py-4 px-6">Price</th>
                          <th className="text-right py-4 px-6">Total</th>
                          <th className="text-right py-4 px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-16 h-16 object-contain mr-4"
                                />
                                <Link 
                                  to={`/products/${item.id}`}
                                  className="font-medium hover:text-primary transition-colors line-clamp-2"
                                >
                                  {item.title}
                                </Link>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex justify-center items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="h-8 w-8"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-10 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-right">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="py-4 px-6 text-right font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(item.id, item.title)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Cart actions */}
                <div className="flex justify-between mt-6">
                  <Button variant="outline" asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              {/* Order summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    asChild
                    className="w-full mt-6"
                  >
                    <Link to="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                  
                  <div className="mt-6 text-sm text-gray-600">
                    <p className="mb-2">We accept:</p>
                    <div className="flex space-x-2">
                      <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded">Visa</div>
                      <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded">Mastercard</div>
                      <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded">PayPal</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
