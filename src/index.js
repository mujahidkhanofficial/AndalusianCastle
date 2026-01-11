/**
 * @fileoverview Application entry point for Andalusian Castle luxury hotel SPA.
 * Configures React 18 root rendering with smooth scroll behavior enabled.
 * @version 1.0.0
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/global.css';

/**
 * Enable smooth scrolling globally for the entire application.
 * This ensures all anchor links and programmatic scrolling use smooth behavior.
 */
document.documentElement.style.scrollBehavior = 'smooth';

/**
 * Root React application renderer.
 * Uses React 18's createRoot API for concurrent features.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
