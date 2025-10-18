import React, { useState, useEffect } from "react";
import Webroutes from "./routes/Webroutes";
import "./App.css";
import SplashScreen from "./components/SplashScreen"; 

const RouteLoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-[9990]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  const SPLASH_DURATION = 2500; 

  useEffect(() => {
  }, []);

  if (loading) {
    return <SplashScreen duration={SPLASH_DURATION} onLoadingComplete={() => setLoading(false)} />;
  }


  return <Webroutes RouteLoadingComponent={RouteLoadingSpinner} />;
};

export default App;