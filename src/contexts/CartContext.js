import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

const CartContext = React.createContext({});

export class CartContextProvider extends React.Component {
  state = {
    cartList: [],
  };

  addCart = item => {
    // 1: 추가됨, -1: 삭제됨
    let status = 0;

    const cartList = cloneDeep(this.state.cartList);
    // 카트에 품목 새로 추가
    // 이미 카트에 존재하는 품목일 경우 제거
    const foundIndex = cartList.findIndex(n => n.id === item.id);
    if (foundIndex === -1) {
      cartList.push(item);
      status = 1;
    } else {
      cartList.splice(foundIndex, 1);
      status = -1;
    }

    this.setState({ cartList });

    return status;
  };

  removeCart = id => {
    // 1: 삭제됨
    let status = 0;

    const cartList = cloneDeep(this.state.cartList);
    // 카트에 품목 새로 추가
    // 이미 카트에 존재하는 품목일 경우 제거
    const foundIndex = cartList.findIndex(n => n.id === id);
    if (foundIndex !== -1) {
      cartList.splice(foundIndex, 1);
      status = 1;
    }

    this.setState({ cartList });

    return status;
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
          addCart: this.addCart,
          removeCart: this.removeCart,
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
