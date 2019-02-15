import React from 'react';
import { mount } from '../../../enzyme';
import productItems from '../../../data/productItems';
import ProductItems from './ProductItems';
import { CartContextProvider } from '../../../contexts/CartContext';

let row, wrapper;
beforeEach(() => {
  row = [...productItems].slice(0, 5);
  wrapper = mount(
    <CartContextProvider>
      <ProductItems key={0} items={row} />
    </CartContextProvider>
  );
});

describe('<Product>', () => {
  it('상품 장바구니 추가', () => {
    const provider = wrapper.find('CartContextProvider');
    const item = wrapper.find('ProductItem').first();
    const itemId = item.prop('item').id;
    item.find('button').simulate('click');

    expect(provider.state().cartList.some(n => n.id === itemId)).toEqual(true);
  });

  it('상품 장바구니 3개 초과 추가', () => {
    const provider = wrapper.find('CartContextProvider');
    const items = wrapper.find('ProductItem');
    // 장바구니에 상품 5개 추가
    for (let i = 0; i < row.length; i++) {
      items
        .find('ProductItem')
        .at(i)
        .find('button')
        .simulate('click');
    }

    expect(provider.state().cartList.length).toEqual(3);
  });

  it('상품 장바구니 삭제', () => {
    const provider = wrapper.find('CartContextProvider');
    const item = wrapper.find('ProductItem').first();
    const itemId = item.prop('item').id;
    item.find('button').simulate('click');
    item.find('button').simulate('click');

    expect(provider.state().cartList.some(n => n.id === itemId)).toEqual(false);
  });
});
