import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from '../../../enzyme';
import productItems from '../../../data/productItems';
import WishlistItems from './WishlistItems';
import { CartContextProvider } from '../../../contexts/CartContext';

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
});

describe('<WishlistItems>', () => {
  it('장바구니 비어있으면 <WishlistItem> 렌더링 안함', () => {
    expect(wrapper.find('WishlistItem').exists()).toBe(false);
  });

  it('장바구니 데이터 존재시 <WishlistItem> 렌더링', () => {
    // 장바구니에 데이터 3개 삽입
    provider.setState({ cartList: [...productItems].slice(0, 3) });
    wrapper.find('WishlistItems').update();

    expect(wrapper.find('WishlistItem').exists()).toBe(true);
  });

  it('<col> 갯수와 <th> 갯수 일치', () => {
    // 장바구니에 데이터 3개 삽입
    provider.setState({ cartList: [...productItems].slice(0, 3) });
    wrapper.find('WishlistItems').update();
    const col = wrapper.find('WishlistItems').find('col');
    const th = wrapper.find('WishlistItems').find('th');

    expect(col.length).toBe(th.length);
  });

  it('장바구니 데이터 전부 삭제시 <WishlistItem> 언마운트', () => {
    // 장바구니에 데이터 3개 삽입
    provider.setState({ cartList: [...productItems].slice(0, 3) });
    wrapper.find('WishlistItems').update();

    // 데이터 삭제
    wrapper.find('.remove-product button').simulate('click');
    wrapper.find('WishlistItems').update();

    expect(wrapper.find('WishlistItem').exists()).toBe(false);
  });

  it('주문 버튼 누르면 <WishlistItem> 언마운트', () => {
    // 장바구니에 데이터 3개 삽입
    provider.setState({ cartList: [...productItems].slice(0, 3) });
    wrapper.find('WishlistItems').update();

    // 주문 버튼 클릭
    wrapper.find('.order button').simulate('click');
    wrapper.find('WishlistItems').update();

    expect(wrapper.find('WishlistItem').exists()).toBe(false);
  });
});
