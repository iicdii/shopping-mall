import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import WishlistItem from './WishlistItem';
import { withCartContext } from '../../../contexts/CartContext';
import { getCartData } from './functions';

class WishlistItems extends PureComponent {
  static propTypes = {
    cart: PropTypes.object.isRequired,
  };

  state = {
    cartData: {},
  };

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

  render() {
    const { cart } = this.props;
    const { cartList: items } = cart;
    const { cartData } = this.state;

    return (
      <div>
        {(items || []).length ? (
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
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Row gutter={24}>
              <Col span={24}>장바구니에 담긴 상품이 없습니다.</Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

export default withCartContext(WishlistItems);
