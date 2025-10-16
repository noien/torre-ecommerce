import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "../components/Homepage";
import Shop from "../components/Shop";
import Shop2 from "../components/Shop2";
import LoadingScreen from "../components/LoadingScreen";

const RouteWrapper = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    // Set loading to true on route change
    setLoading(true);
    // Add a small delay to ensure loading screen shows
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <LoadingScreen duration={600} onLoadingComplete={() => {}} />}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <Routes location={location}>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/patches" element={<Shop2 />} />
        </Routes>
      </div>
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
