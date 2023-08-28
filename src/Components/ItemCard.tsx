import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShopingCart } from "../Context/ShopingCartContext";

type ItemCardProps = {
    id: number;
    name: string;
    price: number;
    imgURL: string;
};

// let quantity: number = 2;

export function ItemCard({ id, name, price, imgURL }: ItemCardProps) {

    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShopingCart();

    const quantity = getItemQuantity(id);

    return (
        <Card style={{width: "300px", height: "380px" }} className="my-3 d-flex justify-content-between">
            <div className="d-flex justify-content-center">
                <Card.Img
                    variant="top"
                    src={imgURL}
                    className="m-auto p-2 "
                    style={{ objectFit: "cover", width: "180px", position: "relative", top: "10px"}}
                />
            </div>
            <Card.Body className="d-flex flex-column mt-2 w-100" style={{position: "absolute", bottom: "0"}}>
                <Card.Title className="title d-flex justify-content-between align-items-center" >
                    <h5>{name}</h5>
                    <h5>{formatCurrency(price)}</h5>
                </Card.Title>
                {quantity === 0 ? (
                    <Button className="my-3" onClick={() => increaseCartQuantity(id)}> + Add to cart</Button>
                ) : (
                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex justify-content-around align-items-center mb-2">
                            <Button className="d-flex align-items-center justify-content-center fs-4" style={{width: "45px", height: "45px"}} onClick={() => decreaseCartQuantity(id)}> - </Button>
                            <div className="text-center">
                                <span>{quantity} items in cart</span>
                            </div>
                            <Button className="d-flex align-items-center justify-content-center fs-4" style={{width: "45px", height: "45px"}} onClick={() => increaseCartQuantity(id)}> + </Button>
                        </div>
                        <Button className="btn-danger" onClick={() => removeFromCart(id)}>Remove</Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}
