import React from 'react';
import { mount } from '../../../enzyme';
import productItems from '../../../data/productItems';
import { groupItems } from './functions';
import ProductItems from './ProductItems';

describe('상품 테스트', () => {
  it('상품 목록 렌더링', () => {
    const items = [...productItems].sort((a,b) => b.score - a.score);
    const list = groupItems(items, 5);

    list.forEach((row, i) => {
      const wrapper = mount(<ProductItems key={i} items={row} />);

      expect(wrapper.find('ProductItem')).toBeDefined();
      expect(wrapper.find('ProductItem')).toHaveLength(row.length);
    });
  });

  it('상품 렌더링', () => {
    const items = [...productItems].sort((a,b) => b.score - a.score);
    const list = groupItems(items, 5);

    list.forEach((row, i) => {
      const wrapper = mount(<ProductItems key={i} items={row} />);

      expect(wrapper.find('.product-item')).toBeDefined();
    });
  });
});

describe('상품 함수 테스트', () => {
  it('상품 2개씩 그룹화', () => {
    const items = [...productItems];

    const list = groupItems(items, 2);
    expect(list.length).toEqual(7);
  });

  it('상품 3개씩 그룹화', () => {
    const items = [...productItems];

    const list = groupItems(items, 3);
    expect(list.length).toEqual(5);
  });

  it('상품 5개씩 그룹화', () => {
    const items = [...productItems];

    const list = groupItems(items, 5);
    expect(list.length).toEqual(3);
  });

  it('상품 100개씩 그룹화', () => {
    const items = [...productItems];

    const list = groupItems(items, 100);
    expect(list.length).toEqual(1);
  });
});
