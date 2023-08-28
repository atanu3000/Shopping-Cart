import { Nav, Navbar as NavbarBS, Button } from "react-bootstrap";
import { useShopingCart } from "../Context/ShopingCartContext";

export default function Navbar() {
    const { openCart, cartQuantity} = useShopingCart();
    return (
        <NavbarBS sticky="top" className="bg-white shadow-sm mb-3 px-3" style={{height: "64px"}}>
                <Nav className="me-auto d-flex align-items-center gap-3">
                    <img src="/favicon/shopping.png" alt="logo" style={{height: "40px"}}/>
                    <h3>Shopping Cart</h3>
                </Nav>
                {cartQuantity > 0 && (
                <Button
                    style={{ width: "3rem", height: "3rem"}}
                    variant="outline-primary"
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    onClick={openCart}
                >
                    Cart
                    <div
                        className="rounded-circle d-flex justify-content-center align-items-center bg-danger"
                        style={{
                            color: "white",
                            width: "1.5em",
                            height: "1.5em",
                            position: "absolute",
                            bottom: "5px",
                            right: "10px",
                        }}
                    >
                        {cartQuantity}
                    </div>
                </Button>
                )}
        </NavbarBS>
    );
}
