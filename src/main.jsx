import React from 'react';
import ReactDOM from 'react-dom/client'
import { CitizenApp } from './CitizenApp.jsx'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CitizenApp />
  </React.StrictMode>,
)
