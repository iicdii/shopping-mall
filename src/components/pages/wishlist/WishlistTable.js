import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { Select, Button } from 'antd';
import WishlistItem from './WishlistItem';
import {
  getCartData,
  getPrice,
  getSalesPrice,
  getOrderPrice,
} from './functions';
import coupons from '../../../data/coupons';
import numberFormat from '../../../utils/number-format';
import './WishlistTable.css';

const Option = Select.Option;

export default class WishlistTable extends PureComponent {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
  };

  state = {
    cartData: {},
    coupon: null,
  };

  coupons = coupons.map((n, i) => ({ ...n, id: `${n.type}-${i}` }));

  componentDidMount() {
    const { cartList } = this.props.cart;
    const cartData = getCartData(cartList);

    if ((Object.keys(cartData) || []).length) this.setState({ cartData });
  }

  componentDidUpdate(prevProps) {
    const { cartList } = this.props.cart;
    if (!(prevProps.cart.cartList || []).length && (cartList || []).length) {
      const cartData = getCartData(cartList);

      this.setState({ cartData });
    }
  }

  handleChange = (id, type, value) => {
    const cartData = cloneDeep(this.state.cartData);
    cartData[id][type] = value;

    this.setState({ cartData });
  };

  handleCouponChange = value => {
    const { cartList } = this.props.cart;
    let cartData = cloneDeep(this.state.cartData);

    const coupon = this.coupons.find(n => n.id === value);

    if (coupon) {
      const field =
        coupon.type === 'amount' ? 'discountAmount' : 'discountRate';

      for (let id in cartData) {
        const item = cartList.find(n => n.id === id);

        if (item.availableCoupon !== false) {
          cartData[id].discountAmount = 0;
          cartData[id].discountRate = 0;
          cartData[id][field] = coupon[field];
        }
      }
    } else {
      for (let id in cartData) {
        const item = cartList.find(n => n.id === id);

        if (item.availableCoupon !== false) {
          cartData[id].discountAmount = 0;
          cartData[id].discountRate = 0;
        }
      }
    }

    this.setState({ coupon, cartData });
  };

  handleRemove = () => {
    const { cart } = this.props;
    const cartData = cloneDeep(this.state.cartData);

    const removeIds = [];
    for (let id in cartData) {
      if (cartData[id].isSelected) {
        removeIds.push(id);
        delete cartData[id];
      }
    }

    if (removeIds.length) {
      cart.removeCart(removeIds);
      this.setState({ cartData });
    }
  };

  get total() {
    const { items } = this.props;
    const { cartData } = this.state;

    let totalPrice = 0;
    let totalSalesPrice = 0;
    let totalOrderPrice = 0;
    for (let id in cartData) {
      if (!cartData[id].isSelected) continue;
      const item = items.find(n => n.id === id);
      if (!item) continue;

      const price = getPrice(cartData[id].quantity, item.price);
      const salesPrice = getSalesPrice(
        price,
        cartData[id].discountAmount,
        cartData[id].discountRate
      );
      const orderPrice = getOrderPrice(price, salesPrice);

      totalPrice += price;
      totalSalesPrice += salesPrice;
      totalOrderPrice += orderPrice;
    }

    return {
      totalPrice,
      totalSalesPrice,
      totalOrderPrice,
    };
  }

  render() {
    const { items } = this.props;
    const { cartData } = this.state;

    return (
      <div className="wishlist-items">
        <div className="ant-table-wrapper">
          <div className="ant-table ant-table-default ant-table-scroll-position-left">
            <div className="ant-table-content">
              <div className="ant-table-body">
                <table>
                  <colgroup>
                    <col width="5%" />
                    <col width="52%" />
                    <col width="10%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                  </colgroup>
                  <thead className="ant-table-thead">
                    <tr>
                      <th>
                        <div>&nbsp;</div>
                      </th>
                      <th>
                        <div>상품정보</div>
                      </th>
                      <th className="center">
                        <div>수량</div>
                      </th>
                      <th className="center">
                        <div>상품금액</div>
                      </th>
                      <th className="center">
                        <div>할인금액</div>
                      </th>
                      <th className="center">
                        <div>주문금액</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {!!(Object.keys(cartData) || []).length &&
                      items.map(item => (
                        <WishlistItem
                          key={item.id}
                          item={item}
                          cartData={cartData[item.id]}
                          onChange={this.handleChange}
                        />
                      ))}
                    <tr className="ant-table-row ant-table-row-level-0 amount-row">
                      <td colSpan={3}>
                        <Select
                          style={{ width: 240 }}
                          placeholder="쿠폰 선택"
                          onChange={this.handleCouponChange}
                        >
                          <Option value={null}>선택 안함</Option>
                          {this.coupons.map((item, i) => (
                            <Option key={i + 1} value={item.id}>
                              {item.title}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td colSpan={3}>
                        <ul>
                          <li className="total-price">
                            <span>총 상품금액</span>
                            <p>{numberFormat(this.total.totalPrice)} 원</p>
                          </li>
                          <li className="total-sales-price">
                            <span>총 할인금액</span>
                            <p>{numberFormat(this.total.totalSalesPrice)} 원</p>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="ant-table-row ant-table-row-level-0 total-amount-row">
                      <td colSpan={3} />
                      <td colSpan={3}>
                        <ul>
                          <li className="total-order-price">
                            <strong>결제금액</strong>
                            <p>
                              <em>
                                {numberFormat(this.total.totalOrderPrice)}
                              </em>{' '}
                              원
                            </p>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <Button
            className="remove-product"
            size="small"
            onClick={this.handleRemove}
          >
            선택상품 삭제
          </Button>
        </div>
      </div>
    );
  }
}
