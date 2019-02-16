import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from './header/Header';
import Footer from './footer/Footer';

const { Content } = Layout;

export default class HomeLayout extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Content className="content" style={{ backgroundColor: 'white' }}>
          {this.props.children}
        </Content>
        <Footer />
      </Layout>
    );
  }
}
