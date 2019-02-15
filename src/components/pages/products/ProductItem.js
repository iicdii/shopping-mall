import React, { PureComponent } from 'react';
import { Col, Button } from 'antd';
import PropTypes from 'prop-types';
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
    const { item } = this.props;

    return (
      <Col className="product-item" span={4}>
        <div className="cover-image">
          <img src={item.coverImage} alt={item.title} />
        </div>
        <div className="title">{item.title}</div>
        <div className="price">{numberFormat(item.price)}원</div>
        <div className="buttons">
          <Button
            shape="circle"
            icon="shopping-cart"
            onClick={this.handleAddCart}
          />
        </div>
      </Col>
    );
  }
}
