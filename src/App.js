import { useState } from 'react';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';
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
      <div className="relative">
        {/* Background using your custom CSS class */}
        <div 
          className="bgimage" 
          style={{
            backgroundImage: `url(${backgroundImage})`
          }}
        ></div>
        
        {/* Loading content overlay */}
        <LoadingScreen 
          onLoadingComplete={handleLoadingComplete}
          duration={3000}
        />
        
        {/* HomePage with fade-in transition */}
        {!isLoading && (
          <div className={`fixed inset-0 transition-opacity duration-500 ${showHomePage ? 'opacity-100' : 'opacity-0'}`}>
            <HomePage />
          </div>
        )}
      </div>
    );
  }

  // Show HomePage with fade-in effect
  return (
    <div className="animate-fade-in">
      <HomePage />
    </div>
  );
}

export default App;