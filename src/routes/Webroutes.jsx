import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "../components/Homepage";
import Shop from "../components/Shop";
import Shop2 from "../components/Shop2";
import Cartpage from "../components/Cartpage";
import CheckoutPage from "../components/CheckoutPage";

const RouteLoadingSpinner = ({ loading }) => {
  
  return (
    <div 
      className={`fixed inset-0 w-screen h-screen flex items-center justify-center 
                  bg-white z-[9990] transition-opacity duration-500 ease-in-out
                  ${loading ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        pointerEvents: loading ? 'auto' : 'none' 
      }}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};


const RouteWrapper = () => {
  const [loading, setLoading] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false); // New state to control DOM removal
  const location = useLocation();

  const LOAD_DURATION = 2000; 
  const FADE_DURATION = 500; 

  useEffect(() => {
    setIsComponentVisible(true);
    setLoading(true);
        const loadTimer = setTimeout(() => {
      setLoading(false); 
    }, LOAD_DURATION); 

    const fadeTimer = setTimeout(() => {
      setIsComponentVisible(false); 
    }, LOAD_DURATION + FADE_DURATION); 

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(fadeTimer);
    };
  }, [location.pathname]); 

  return (
    <>
      {isComponentVisible && <RouteLoadingSpinner loading={loading} />} 
      
      <Routes location={location}>
        <Route path="/" element={<Homepage />} />
        <Route path="/caps" element={<Shop />} />
        <Route path="/patches" element={<Shop2 />} />
        <Route path="/cart" element={<Cartpage />} /> 
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
};

const Webroutes = () => {
  return (
    <Router>
        <RouteWrapper />
    </Router>
  );
};

export default Webroutes;