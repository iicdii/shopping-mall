import React, { PureComponent } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';
import numberFormat from '../../../utils/number-format';
import './ProductItem.css';

export default class ProductItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    cart: PropTypes.object.isRequired,
  };

  handleAddCart = () => {
    const { item, cart } = this.props;
    const { addCart } = cart;

    addCart(item);
  };

  render() {
    const { item, cart } = this.props;
    const { cartList } = cart;

    return (
      <div className="product-item">
        <div className="cover-image">
          <img src={item.coverImage} alt={item.title} />
        </div>
        <div className="title">{truncate(item.title, { length: 37 })}</div>
        <div className="bottom">
          <div className="price">
            <span className="price-text">{numberFormat(item.price)}</span>
            <span className="won">원</span>
          </div>
          <div className="buttons">
            <Button
              type={
                (cartList || []).some(n => n.id === item.id) ? 'primary' : ''
              }
              shape="circle"
              icon="shopping-cart"
              onClick={this.handleAddCart}
            />
          </div>
        </div>
      </div>
    );
  }
}
