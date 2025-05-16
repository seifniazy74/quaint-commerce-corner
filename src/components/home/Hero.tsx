
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Discover Amazing Products For Your Lifestyle
            </h1>
            <p className="text-xl opacity-90">
              Explore our curated collection of high-quality products at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <Button asChild size="lg" className="font-semibold">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 font-semibold">
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div className="bg-white p-2 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Featured Products" 
                className="w-full h-auto rounded max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
