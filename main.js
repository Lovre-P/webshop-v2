// This is a simple loader script for GitHub Pages
// It dynamically imports the TypeScript file using a script tag

document.addEventListener('DOMContentLoaded', function() {
  // Create a script element for the TypeScript loader
  const script = document.createElement('script');
  script.src = 'https://esm.sh/tsx';
  script.async = true;
  
  // When the TSX loader is ready, load our app
  script.onload = function() {
    // Create a script element for our app
    const appScript = document.createElement('script');
    appScript.type = 'module';
    appScript.textContent = `
      import { render } from 'https://esm.sh/tsx';
      import React from 'react';
      import ReactDOM from 'react-dom/client';
      import App from './App.tsx';

      const rootElement = document.getElementById('root');
      if (!rootElement) {
        throw new Error("Could not find root element to mount to");
      }

      const root = ReactDOM.createRoot(rootElement);
      root.render(
        React.createElement(React.StrictMode, null, 
          React.createElement(App)
        )
      );
    `;
    
    // Add the app script to the document
    document.head.appendChild(appScript);
  };
  
  // Add the TSX loader script to the document
  document.head.appendChild(script);
});
