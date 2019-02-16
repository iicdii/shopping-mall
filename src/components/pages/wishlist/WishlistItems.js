import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { withCartContext } from '../../../contexts/CartContext';
import WishlistTable from './WishlistTable';
import './WishlistItems.css';

class WishlistItems extends PureComponent {
  static propTypes = {
    cart: PropTypes.object.isRequired,
  };

  render() {
    const { cart } = this.props;
    const { cartList: items } = cart;

    return (
      <div>
        {(items || []).length ? (
          <WishlistTable cart={cart} items={items} />
        ) : (
          <div className="empty">
            <h2 className="title">장바구니에 담긴 상품이 없습니다.</h2>
            <Link to="/products">
              <Button className="continue-btn">쇼핑 계속하기</Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default withCartContext(WishlistItems);
