import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/inter';

import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles'
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <InitColorSchemeScript />
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
