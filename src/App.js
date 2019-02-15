import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import BasicLayout from './components/layout/BasicLayout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BasicLayout />
      </div>
    );
  }
}

export default App;
