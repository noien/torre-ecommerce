import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../components/Homepage";
import Shop from "../components/Shop";
import Shop2 from "../components/Shop2";
import Cartpage from "../components/Cartpage";
import CheckoutPage from "../components/CheckoutPage";

const Webroutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/caps" element={<Shop />} />
        <Route path="/patches" element={<Shop2 />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
};

export default Webroutes;
