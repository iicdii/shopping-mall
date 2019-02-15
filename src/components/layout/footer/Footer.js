import React, { Component } from 'react';
import { Layout } from 'antd';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <Layout.Footer className="footer">
        <div className="footer-title">Class101 Inc.</div>
      </Layout.Footer>
    )
  }
}
