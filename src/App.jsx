import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import FullScreenPrompt from './components/FullScreenPrompt';


const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    
  }, []);

  const enableFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    }
  };

  return (
    <div className="App min-h-screen bg-gray-100 flex items-center justify-center">
      {isFullScreen ? <Quiz /> : <FullScreenPrompt onEnableFullScreen={enableFullScreen} />}
    </div>
  );
};

export default App;
