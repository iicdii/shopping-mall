import React, { PureComponent } from 'react';
import { Col, Button, message } from 'antd';
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

    const status = addCart(item);

    switch (status) {
      case 1:
        message.success('장바구니에 상품이 추가 되었습니다.');
        break;
      case -1:
        message.success('장바구니에 상품이 추가 되었습니다.');
        break;
      default:
        message.error('에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
        break;
    }
  };

  render() {
    const { item } = this.props;

    return (
      <Col className="product-item" span={4}>
        <div className="cover-image">
          <img src={item.coverImage} alt={item.title} />
        </div>
        <div className="title">{item.title}</div>
        <div className="price">{numberFormat(item.price)}</div>
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
