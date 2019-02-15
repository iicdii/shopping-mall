import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from './header/Header';
import Footer from './footer/Footer';
import './PageLayout.css';

const { Content } = Layout;

export default class PageLayout extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Content className="content">
          <div className="container">
            {this.props.children}
          </div>
        </Content>
        <Footer />
      </Layout>
    )
  }
}
