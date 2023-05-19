import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UsersProvider } from './context/UsersContext';
import { QuestionsProvider } from './context/QuestionsContext';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UsersProvider>
    <QuestionsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuestionsProvider>
  </UsersProvider>
);