import { Routes, Route } from 'react-router-dom';
import App from "./App.jsx";
import Home from "./Home.jsx";
import Products from "./Products.jsx";
const Routings = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>
            </Routes>
        </div>
    );
}
export default Routings;