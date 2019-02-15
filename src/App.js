import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import BasicLayout from './components/layout/BasicLayout';
import { CartContextProvider } from './contexts/CartContext';

class App extends Component {
  render() {
    return (
      <CartContextProvider>
        <div className="App">
          <BasicLayout />
        </div>
      </CartContextProvider>
    );
  }
}

export default App;
