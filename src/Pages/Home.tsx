import { Col, Row } from "react-bootstrap";
import storeItems from "../Data/items.json";
import { ItemCard } from "../Components/ItemCard";

export function Home() {
    return (
        <>
            {/* <h1>Store</h1> */}
            <Row>
                {storeItems.items && storeItems.items.length > 0 ? (
                    storeItems.items.map((item: any) => (
                        <Col key={item.id} className="d-flex justify-content-center">
                            <ItemCard {...item} />
                        </Col>
                    ))
                ) : 
                <h4 className="text-center mt-5">No Products to show</h4>
                }
            </Row>
        </>
    );
}
