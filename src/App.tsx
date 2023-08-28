import { Container } from "react-bootstrap";
import { Home } from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { ShopingCartProvider } from "./Context/ShopingCartContext";

function App() {
    return (
        <ShopingCartProvider>
            <Navbar />
            <Container className="mb-4">
                <Home />
            </Container>
        </ShopingCartProvider>
    );
}

export default App;
