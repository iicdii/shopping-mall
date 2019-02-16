import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from '../../../enzyme';
import productItems from '../../../data/productItems';
import WishlistItems from './WishlistItems';
import { CartContextProvider } from '../../../contexts/CartContext';

const priceToNumber = text => {
  return parseInt(
    text
      .split(' ')[0]
      .split(',')
      .join(''),
    10
  );
};

let wrapper, provider;
beforeEach(() => {
  wrapper = mount(
    <Router>
      <CartContextProvider>
        <WishlistItems />
      </CartContextProvider>
    </Router>
  );
  provider = wrapper.find('CartContextProvider');
  provider.setState({ cartList: [...productItems].slice(0, 3) });
  wrapper.find('WishlistItems').update();
});

describe('<WishlistTable>', () => {
  it('장바구니 데이터 존재시 <WishlistTable> 렌더링', () => {
    expect(wrapper.find('WishlistTable').exists()).toBe(true);
  });
});

describe('<WishlistTable> 금액 계산', () => {
  it('전체 금액 계산', () => {
    const cartList = provider.state('cartList');

    const totalPrice = cartList.map(n => n.price).reduce((a, b) => a + b, 0);
    const tablePrice = priceToNumber(wrapper.find('.total-price p').text());

    expect(totalPrice).toBe(tablePrice);
  });

  it('전체 금액 - 전체 할인 금액 계산', () => {
    const cartList = provider.state('cartList');

    const totalPrice = cartList.map(n => n.price).reduce((a, b) => a + b, 0);
    const salesPrice = priceToNumber(
      wrapper.find('.total-sales-price p').text()
    );
    const tablePrice = priceToNumber(
      wrapper.find('.total-order-price p').text()
    );

    expect(totalPrice - salesPrice).toBe(tablePrice);
  });
});
