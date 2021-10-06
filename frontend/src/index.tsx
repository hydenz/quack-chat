import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from 'store';
import { Provider } from 'react-redux';

const Index = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
