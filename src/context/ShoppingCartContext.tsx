import { createContext, useContext, useState } from "react";

type ShoppingCartContextProps = {
  children: React.ReactNode;
};
// Setting the value for the functions that will be used in the context
type ShoppingCartContext={
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
}
type CartItem = {
    id: number;
    quantity: number;
}

//  Creating the context
const ShoppingCartContext = createContext({} as ShoppingCartContext);
//  Creating the provider
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartContextProps) {
    const [cartItems, setCartItems] =useState<CartItem[]>([]);
    //  Function to get the quantity of an item in the cart
    const getItemQuantity = (id: number) => {
        const item = cartItems.find(item => item.id === id);
        return item ? item.quantity : 0;
    }
    //  Function to increase the quantity of an item in the cart
    function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }
  return (
    <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity,decreaseCartQuantity,removeFromCart}}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
