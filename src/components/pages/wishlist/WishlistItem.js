import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Checkbox, InputNumber } from 'antd';
import numberFormat from '../../../utils/number-format';
import './WishlistItem.css';
import { getPrice, getSalesPrice, getOrderPrice } from './functions';

export default class WishlistItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onChange: PropTypes.func,
    cartData: PropTypes.object,
  };

  handleSelectChange = e => {
    const { item, onChange } = this.props;
    onChange(item.id, 'isSelected', e.target.checked);
  };

  handleQuantityChange = value => {
    const { item, onChange } = this.props;
    onChange(item.id, 'quantity', value);
  };

  get price() {
    const { item, cartData } = this.props;

    return getPrice(cartData.quantity, item.price);
  }

  get salesPrice() {
    const { cartData } = this.props;
    const { discountAmount, discountRate } = cartData;
    const { price } = this;

    return getSalesPrice(price, discountAmount, discountRate);
  }

  get orderPrice() {
    const { price, salesPrice } = this;

    return getOrderPrice(price, salesPrice);
  }

  render() {
    const { item, cartData } = this.props;

    return (
      <tr className="ant-table-row ant-table-row-level-0">
        <td>
          <Checkbox onChange={this.handleSelectChange} defaultChecked={true} />
        </td>
        <td>
          <Row gutter={24}>
            <Col span={4}>
              <img src={item.coverImage} alt={item.title} />
            </Col>
            <Col span={20}>
              <div>{item.title}</div>
            </Col>
          </Row>
        </td>
        <td>
          <InputNumber
            min={1}
            max={100000}
            defaultValue={cartData.quantity}
            onChange={this.handleQuantityChange}
          />
        </td>
        <td className="price">{numberFormat(this.price)}원</td>
        <td className="sales-price">{numberFormat(this.salesPrice)}원</td>
        <td className="order-price">{numberFormat(this.orderPrice)}원</td>
      </tr>
    );
  }
}
