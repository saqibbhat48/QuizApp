import React from 'react';

const FullScreenPrompt = ({ onEnableFullScreen }) => {
  return (
    <div className="fullscreen-prompt fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl mb-4 text-black">Please enable full screen mode to start the quiz</h1>
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600"
          onClick={onEnableFullScreen}
        >
          Enable Full Screen
        </button>
      </div>
    </div>
  );
};

export default FullScreenPrompt;
