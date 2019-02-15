import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Menu } from 'antd';
import { mount } from '../../../enzyme';
import { CartContextProvider } from '../../../contexts/CartContext';
import Header from './Header';

describe('<Header>', () => {
  it('<Menu> 렌더링', () => {
    const wrapper = mount(<Menu />);

    expect(wrapper.exists()).toBe(true);
  });

  it('장바구니 <Badge> 카운트 변경', () => {
    const wrapper = mount(
      <Router>
        <CartContextProvider>
          <Header />
        </CartContextProvider>
      </Router>
    );
    const provider = wrapper.find('CartContextProvider');
    const testItem = {
      id: 'pHr0phFtcWhsgZhSVe9F',
      title: '글씨 쓰는 김이영과 함께 아이패드에 그려낸 캘리그라피',
      coverImage:
        'https://cdn.class101.net/images/864f377f-93d9-4520-94de-19ca142c432f',
      price: 123000,
      score: 453,
    };
    provider.setState({ cartList: [testItem] });

    const badge = wrapper.find('Badge');

    expect(badge.prop('count')).toEqual(provider.state().cartList.length);
  });
});
