import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// npx create-react-app my-app --template electron-builder
// https://www.npmjs.com/package/cra-template-electron-builder-typescript
reportWebVitals();
