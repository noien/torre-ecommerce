import React, { useEffect, useState } from 'react';

const Spinner = ({ size = 48 }) => (
  <div
    style={{
      width: size,
      height: size,
      border: '4px solid #e0e0e0',
      borderTop: '4px solid #38bdf8',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }}
  />
);


// Add keyframes for spinner animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

const LoadingScreen = ({ onLoadingComplete, duration = 2000 }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), duration - 400);
    const doneTimer = setTimeout(() => onLoadingComplete && onLoadingComplete(), duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [duration, onLoadingComplete]);

  return (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      opacity: fade ? 0 : 1,
      pointerEvents: fade ? "none" : "auto",
      transition: "opacity 400ms",
    }}
  >
    <Spinner size={56} />
  </div>
);



};

export default LoadingScreen;