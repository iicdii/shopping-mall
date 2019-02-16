import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withCartContext } from '../../../contexts/CartContext';
import WishlistTable from './WishlistTable';

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
          <div>장바구니에 담긴 상품이 없습니다.</div>
        )}
      </div>
    );
  }
}

export default withCartContext(WishlistItems);
