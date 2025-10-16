import React, { useState, useEffect } from "react";
import Webroutes from "./routes/Webroutes";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen"; 

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return <Webroutes />;
};

export default App;
