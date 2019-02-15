import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Products from '../pages/products/Products';
import Wishlist from '../pages/wishlist/Wishlist';

export default class BasicLayout extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/wishlist" component={Wishlist} />
        </div>
      </Router>
    )
  }
}
