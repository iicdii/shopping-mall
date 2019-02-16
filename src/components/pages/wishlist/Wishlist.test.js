import React from 'react';
import { mount } from '../../../enzyme';
import WishlistItems from './WishlistItems';
import { getPrice, getSalesPrice, getOrderPrice } from './functions';

describe('<Wishlist>', () => {
  it('<WishlistItems> 렌더링', () => {
    const wrapper = mount(<WishlistItems />);

    expect(wrapper.exists()).toBe(true);
  });
});

describe('기본 금액 계산', () => {
  it('기본 금액 1개 * 10000원', () => {
    const price = getPrice(1, 10000);
    expect(price).toEqual(10000);
  });

  it('기본 금액 2개 * 10000원', () => {
    const price = getPrice(2, 10000);
    expect(price).toEqual(20000);
  });

  it('기본 금액 1개 * 20000원', () => {
    const price = getPrice(1, 20000);
    expect(price).toEqual(20000);
  });

  it('기본 금액 10000개 * 10000원', () => {
    const price = getPrice(10000, 20000);
    expect(price).toEqual(200000000);
  });

  it('기본 금액 "1"개 * 10000원', () => {
    const price = getPrice('1', 10000);
    expect(price).toEqual(10000);
  });

  it('기본 금액 1개 * "10000"원', () => {
    const price = getPrice(1, '10000');
    expect(price).toEqual(10000);
  });

  it('기본 금액 "1"개 * "10000"원', () => {
    const price = getPrice('1', '10000');
    expect(price).toEqual(10000);
  });
});

describe('할인 금액 계산', () => {
  it('5000원 세일 금액', () => {
    const price = getSalesPrice(10000, 5000);
    expect(price).toEqual(5000);
  });

  it('8000원 세일 금액', () => {
    const price = getSalesPrice(7500, 8000);
    expect(price).toEqual(8000);
  });

  it('10000원에서 10% 세일 금액', () => {
    const price = getSalesPrice(10000, 0, 10);
    expect(price).toEqual(1000);
  });

  it('12000원에서 50% 세일 금액', () => {
    const price = getSalesPrice(12000, 0, 50);
    expect(price).toEqual(6000);
  });

  it('10000원에서 100% 세일 금액', () => {
    const price = getSalesPrice(10000, 0, 100);
    expect(price).toEqual(10000);
  });

  it('10000원에서 1000% 세일 금액', () => {
    const price = getSalesPrice(10000, 0, 1000);
    expect(price).toEqual(10000);
  });

  it('10000원에서 "10"% 세일 금액', () => {
    const price = getSalesPrice(10000, 0, '10');
    expect(price).toEqual(1000);
  });

  it('"10000"원에서 "10"% 세일 금액', () => {
    const price = getSalesPrice('10000', 0, '10');
    expect(price).toEqual(1000);
  });
});

describe('최종 주문 금액 계산', () => {
  it('3개 * 10000원 - 5000원 할인', () => {
    const price = getPrice(3, 10000);
    const salesPrice = getSalesPrice(price, 5000);
    const orderPrice = getOrderPrice(price, salesPrice);
    expect(price).toEqual(30000);
    expect(salesPrice).toEqual(5000);
    expect(orderPrice).toEqual(25000);
  });

  it('3개 * 10000원 - 10% 할인', () => {
    const price = getPrice(3, 10000);
    const salesPrice = getSalesPrice(price, 0, 10);
    const orderPrice = getOrderPrice(price, salesPrice);
    expect(price).toEqual(30000);
    expect(salesPrice).toEqual(3000);
    expect(orderPrice).toEqual(27000);
  });

  it('100개 * 10000원 - 10% 할인', () => {
    const price = getPrice(100, 10000);
    const salesPrice = getSalesPrice(price, 0, 10);
    const orderPrice = getOrderPrice(price, salesPrice);
    expect(price).toEqual(1000000);
    expect(salesPrice).toEqual(100000);
    expect(orderPrice).toEqual(900000);
  });

  it('5개 * 30000원 - 0% 할인', () => {
    const price = getPrice(5, 30000);
    const salesPrice = getSalesPrice(price, 0, 0);
    const orderPrice = getOrderPrice(price, salesPrice);
    expect(price).toEqual(150000);
    expect(salesPrice).toEqual(0);
    expect(orderPrice).toEqual(150000);
  });
});
