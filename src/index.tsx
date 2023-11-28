import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store';
import { UserProvider, Web3Provider } from './context';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <Router>
    <Provider store={store}>
      <Web3Provider>
        <UserProvider>
          <App />
        </UserProvider>
      </Web3Provider>
    </Provider>
  </Router>
);
export { };