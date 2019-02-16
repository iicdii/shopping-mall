import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { message } from 'antd';

const CartContext = React.createContext({});

export class CartContextProvider extends React.Component {
  state = {
    cartList: [],
  };

  addCart = item => {
    // 1: 추가됨
    let status = 0;

    const cartList = cloneDeep(this.state.cartList);
    // 카트에 품목 새로 추가
    const foundIndex = cartList.findIndex(n => n.id === item.id);
    if (foundIndex === -1) {
      // 3개 초과일 경우 에러
      if (cartList.length >= 3) {
        message.warning('장바구니에 3개 이상 상품을 담을 수 없습니다.');
      } else {
        cartList.push(item);
        message.success('장바구니에 상품이 추가되었습니다.');
        status = 1;
      }
    }

    this.setState({ cartList });

    return status;
  };

  removeCart = ids => {
    ids = Array.isArray(ids) ? ids : [ids];
    const cartList = this.state.cartList.filter(n => !ids.includes(n.id));

    // 1: 삭제됨
    const status = this.state.cartList.length !== cartList.length ? 1 : 0;
    if (status) {
      message.warning('장바구니에서 상품이 삭제되었습니다.');
    }

    this.setState({ cartList });

    return status;
  };

  toggleCart = item => {
    // 1: 추가됨, -1: 삭제됨
    let status = 0;

    const cartList = cloneDeep(this.state.cartList);
    // 카트에 품목 새로 추가
    // 이미 카트에 존재하는 품목일 경우 제거
    const foundIndex = cartList.findIndex(n => n.id === item.id);
    if (foundIndex === -1) {
      // 3개 초과일 경우 에러
      if (cartList.length >= 3) {
        message.warning('장바구니에 3개 이상 상품을 담을 수 없습니다.');
      } else {
        cartList.push(item);
        message.success('장바구니에 상품이 추가되었습니다.');
        status = 1;
      }
    } else {
      cartList.splice(foundIndex, 1);
      message.warning('장바구니에서 상품이 삭제되었습니다.');
      status = -1;
    }

    this.setState({ cartList });

    return status;
  };

  clearCart = () => {
    this.setState({ cartList: [] });

    // 1: 삭제됨
    return 1;
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
          addCart: this.addCart,
          removeCart: this.removeCart,
          clearCart: this.clearCart,
          toggleCart: this.toggleCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export const withCartContext = ChildComponent => props => (
  <CartContext.Consumer>
    {context => <ChildComponent {...props} cart={context} />}
  </CartContext.Consumer>
);
