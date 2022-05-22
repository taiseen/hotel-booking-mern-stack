import { DarkModeContextProvider } from "./context/DarkModeContext";
import { AuthContextProvider } from "./context/AuthContext";
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './style/index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>

    <AuthContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthContextProvider>

  </React.StrictMode>
);

