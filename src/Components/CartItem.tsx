import { Button, Stack } from "react-bootstrap";
import { useShopingCart } from "../Context/ShopingCartContext";
import storeItems from "../Data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
    id: number;
    quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShopingCart();
    const item = storeItems.items.find((item) => item.id === id);
    if (!item) return null;

    return (
        <Stack gap={4} >
            <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
                src={item.imgURL}
                style={{ width: "120px", objectFit: "cover" }}
            />
            <div className="me-auto">
                <div>
                    <h6 className="d-inline-flex">{item.name}</h6>
                    {quantity > 1 && (
                        <span className="text-muted px-1 fs-6" style={{ fontSize: "small" }} >
                            x{quantity}
                        </span>
                    )}
                </div>
                <div>
                    <p>{formatCurrency(item.price)}</p>
                </div>
            </div>
            <div className="ms-auto">
                <h6>{formatCurrency(item.price * quantity)}</h6>
            </div>
            </Stack>
            <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
                <div className="d-flex justify-content-around" style={{width: "120px"}}>
                    {quantity > 1 ? (
                        <Button variant="outline-dark" style={{width: "30px", height: "30px"}} className="d-flex align-items-center justify-content-center fs-4 p-3" onClick={() => decreaseCartQuantity(id)}>
                            - 
                        </Button>
                    ) : ( 
                        <Button variant="outline-dark" style={{width: "30px", height: "30px"}} className="d-flex align-items-center justify-content-center fs-4 p-3" disabled>
                            - 
                        </Button>
                    )}
                    <Button variant="outline-dark" style={{width: "30px", height: "30px"}} className="d-flex align-items-center justify-content-center fs-4 p-3" onClick={() => increaseCartQuantity(id)}>
                        + 
                    </Button>
                </div>
                <div className="me-auto">
                    
                    <Button variant="outline-danger" className="btn-sm p-2 border border-danger" onClick={() => removeFromCart(id)}>
                        REMOVE
                    </Button>
                </div>
            </Stack>
        </Stack>
    );
}
