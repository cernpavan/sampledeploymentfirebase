import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from './App';
import './index.css';
import StoreContextProvider from './context/StoreContext';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn0xTwhWn-0wpT69_6cMiXOEjSqe0P2wk",
  authDomain: "papers-a751e.firebaseapp.com",
  projectId: "papers-a751e",
  storageBucket: "papers-a751e.appspot.com",
  messagingSenderId: "1054282191946",
  appId: "1:1054282191946:web:eca370b925495e061642b3",
  measurementId: "G-GE172Y3G4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Render the React app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StoreContextProvider> 
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </StrictMode>
);
