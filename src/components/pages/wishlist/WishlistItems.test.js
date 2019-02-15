import React from 'react';
import { mount } from '../../../enzyme';
import productItems from '../../../data/productItems';
import WishlistItems from './WishlistItems';
import { CartContextProvider } from '../../../contexts/CartContext';

let wrapper, provider;
beforeEach(() => {
  wrapper = mount(
    <CartContextProvider>
      <WishlistItems />
    </CartContextProvider>
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
});
