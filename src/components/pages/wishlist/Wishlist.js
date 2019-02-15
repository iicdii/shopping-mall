import React, { Component } from 'react';
import PageLayout from '../../layout/PageLayout';
import './Wishlist.css';
import WishlistItems from './WishlistItems';

export default class Wishlist extends Component {
  render() {
    return (
      <PageLayout>
        <div className="wishlist">
          <WishlistItems />
        </div>
      </PageLayout>
    );
  }
}
