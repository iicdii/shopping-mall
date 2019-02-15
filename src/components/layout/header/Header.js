import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './Header.css';

class Header extends Component {
  render() {
    const { match } = this.props;

    return (
      <Layout.Header>
        <Link to="/">
          <div className="logo" />
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          selectedKeys={[match.url]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="/products">
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="/wishlist">
            <Link to="/wishlist">Wishlist</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}

export default withRouter(Header);
