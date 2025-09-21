import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';
import Shop from './components/Shop';
import backgroundImage from './assets/LoadingPage.png'; 

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHomePage, setShowHomePage] = useState(false);

  const handleLoadingComplete = () => {
    // Start fade out of loading screen
    setIsLoading(false);
    // Delay showing homepage for smooth transition
    setTimeout(() => {
      setShowHomePage(true);
    }, 300); // Small delay for smoother transition
  };

  // Loading screen with fade-out transition
if (isLoading || !showHomePage) {
  return (
    <div className="w-screen h-screen relative">
      {/* Background */}
      <div 
        className="bgimage" 
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      ></div>
      
      {/* Loading overlay */}
      <LoadingScreen 
        onLoadingComplete={handleLoadingComplete}
        duration={3000}
      />

      {/* HomePage with fade-in */}
      {!isLoading && (
        <div className={`fixed inset-0 transition-opacity duration-500 ${showHomePage ? 'opacity-100' : 'opacity-0'}`}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}


  // Show HomePage with fade-in effect
  return (
    <div className="animate-fade-in">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;