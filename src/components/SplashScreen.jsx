import React, { useEffect, useState } from 'react';
import LoadingPageImage from '../assets/LoadingPage.png';
import '../styles/SplashScreen.css';

const SplashScreen = ({ onLoadingComplete, duration = 2500 }) => {
  const [fade, setFade] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), duration - 600);
    const doneTimer = setTimeout(() => {
      setVisible(false);
      onLoadingComplete?.();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [duration, onLoadingComplete]);

  if (!visible) return null;

  return (
    <div
      className={`splash-screen ${fade ? 'fade-out' : ''}`}
      style={{ pointerEvents: fade ? 'none' : 'auto' }}
    >
      {/* Background image */}
      <img
        src={LoadingPageImage}
        alt="INK & THREADS Splash Screen"
        className="splash-screen-image"
      />

      {/* Loading text centered */}
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default SplashScreen;
