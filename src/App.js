import React, { useState, useEffect } from "react";
import Webroutes from "./routes/Webroutes";
import "./App.css";
import LoadingPageImage from "./assets/LoadingPage.png"; // splash image

// 🔹 Splash Screen Component (Tailwind)
const SplashScreen = ({ duration, onLoadingComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onLoadingComplete();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-in-out z-[9999] ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background Image */}
      <img
        src={LoadingPageImage}
        alt="Splash Screen"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
      />

      {/* Spinner + Text */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
        <p className="text-white text-lg font-semibold tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const SPLASH_DURATION = 2500; // 2.5 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <SplashScreen
        duration={SPLASH_DURATION}
        onLoadingComplete={() => setLoading(false)}
      />
    );
  }

  return <Webroutes />;
};

export default App;
