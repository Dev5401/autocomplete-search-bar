import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import suggestions from './assets/suggestions.json'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App
      placeholder={'Search...'}
      suggestions={suggestions}
    />
  </StrictMode>,
);
