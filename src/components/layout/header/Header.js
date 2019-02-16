import React, { Component } from 'react';
import { Layout, Menu, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withCartContext } from '../../../contexts/CartContext';
import './Header.css';

class Header extends Component {
  render() {
    const { match, cart } = this.props;
    const { cartList } = cart;

    return (
      <Layout.Header>
        <div className="container">
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
              <Link to="/products">상품</Link>
            </Menu.Item>
            <Menu.Item key="/wishlist">
              <Link to="/wishlist">
                <Badge count={cartList.length}>
                  <span>장바구니</span>
                </Badge>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </Layout.Header>
    );
  }
}

export default withRouter(withCartContext(Header));
