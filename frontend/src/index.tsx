import React from 'react';
import ReactDOM from 'react-dom/client';
import { RootNavigation } from './navigation/RootNavigation';
import reportWebVitals from './reportWebVitals';
import './themes/global.less';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RootNavigation />
  </React.StrictMode>
);

reportWebVitals();
