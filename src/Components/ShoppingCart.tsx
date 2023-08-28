import { Offcanvas, Stack } from "react-bootstrap";
import { useShopingCart } from "../Context/ShopingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../Data/items.json"


type ShopingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen } : ShopingCartProps) {

    const { closeCart, cartItems } = useShopingCart();

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={5}>
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map(item => (
                            <CartItem key={item.id} {...item}/>
                        ))}
                        <hr />
                        <div className="ms-auto fs-5 fw-bold">
                            Total{" "}
                            {formatCurrency(
                                cartItems.reduce((total, cartItem) => {
                                    const item = storeItems.items.find(i => i.id === cartItem.id);
                                    return total + (item?.price || 0) * cartItem.quantity
                                }, 0)
                            )}
                        </div>
                        </>
                    ) : ( 
                        <h5 className="text-center text-muted mt-5">No item to show</h5>
                    )}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
