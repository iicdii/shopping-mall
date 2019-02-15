import React from 'react';
import { mount } from '../../../enzyme';
import productItems from '../../../data/productItems';
import { groupItems } from './functions';
import ProductItems from './ProductItems';
import { CartContextProvider } from '../../../contexts/CartContext';

describe('<Product>', () => {
  it('상품 장바구니 추가', () => {
    const list = groupItems([...productItems], 5);

    const row = list[0];
    const wrapper = mount(
      <CartContextProvider>
        <ProductItems key={0} items={row} />
      </CartContextProvider>
    );
    const provider = wrapper.find('CartContextProvider');
    const item = wrapper.find('ProductItem').first();
    const itemId = item.prop('item').id;
    item.find('button').simulate('click');

    expect(provider.state().cartList.some(n => n.id === itemId)).toEqual(true);
  });

  it('상품 장바구니 삭제', () => {
    const list = groupItems([...productItems], 5);

    const row = list[0];
    const wrapper = mount(
      <CartContextProvider>
        <ProductItems key={0} items={row} />
      </CartContextProvider>
    );
    const provider = wrapper.find('CartContextProvider');
    const item = wrapper.find('ProductItem').first();
    const itemId = item.prop('item').id;
    item.find('button').simulate('click');
    item.find('button').simulate('click');

    expect(provider.state().cartList.some(n => n.id === itemId)).toEqual(false);
  });
});
