import React, { useEffect, useState } from 'react';

const Spinner = ({ size = 60 }) => (
  <div className="flex items-center justify-center z-[9999]">
    <div
      className="animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"
      style={{
        width: size,
        height: size,
        borderTopColor: "#3b82f6",
      }}
    />
  </div>
);

const LoadingScreen = ({ onLoadingComplete, duration = 2000 }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), duration - 400);
    const doneTimer = setTimeout(() => {
      onLoadingComplete?.();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [duration, onLoadingComplete]);

  if (fade) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1f2937] z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingScreen;