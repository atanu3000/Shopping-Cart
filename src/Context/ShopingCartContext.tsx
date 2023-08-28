import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../Components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShopingCartProviderProps = {
    children: ReactNode;
};

type ShopingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number;
    cartItems: CartItem[];
};

type CartItem = {
    id: number;
    quantity: number;
};

const ShopingCartContext = createContext({} as ShopingCartContext);

export function useShopingCart() { // custom context hook
    return useContext(ShopingCartContext);
}

export function ShopingCartProvider({ children }: ShopingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id: number) {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number) {
        setCartItems((currItems) => {
            const itemToUpdate = currItems.find((item) => item.id === id);

            if (!itemToUpdate) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function decreaseCartQuantity(id: number) {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.map((item) => {
                if (item.id === id) {
                    if (item.quantity === 1) {
                        return null; // Use null to mark items for removal
                    } else {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                } else {
                    return item;
                }
            });

            // Filter out null entries to remove items marked for removal
            return updatedCartItems.filter(
                (item) => item !== null
            ) as CartItem[];
        });
    }

    function removeFromCart(id: number) {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== id);
        });
    }

    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);

    return (
        <ShopingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartQuantity,
                cartItems,
                openCart,
                closeCart,
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShopingCartContext.Provider>
    );
}
