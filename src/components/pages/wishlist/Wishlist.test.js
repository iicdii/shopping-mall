import React from 'react';
import { mount } from '../../../enzyme';
import WishlistItems from './WishlistItems';

describe('<Wishlist>', () => {
  it('<WishlistItems> 렌더링', () => {
    const wrapper = mount(<WishlistItems />);

    expect(wrapper.exists()).toBe(true);
  });
});
