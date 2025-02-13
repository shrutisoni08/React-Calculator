import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>
)
