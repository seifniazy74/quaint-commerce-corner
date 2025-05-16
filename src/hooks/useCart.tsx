
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (product) => 
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item.id === product.id 
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }
          
          return { 
            items: [...state.items, { ...product, quantity: 1 }] 
          };
        }),
      
      removeItem: (id) => 
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        })),
      
      updateQuantity: (id, quantity) => 
        set((state) => ({
          items: state.items.map(item => 
            item.id === id 
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        })),
      
      clearCart: () => set({ items: [] })
    }),
    {
      name: "shopping-cart",
    }
  )
);
