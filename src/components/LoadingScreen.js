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
      margin: '0 auto',
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
      className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black transition-opacity duration-400"
      style={{
        opacity: fade ? 0 : 1,
        pointerEvents: fade ? 'none' : 'auto',
        transition: 'opacity 400ms',
      }}
    >
      <Spinner size={56} />
    </div>
  );
};

export default LoadingScreen;