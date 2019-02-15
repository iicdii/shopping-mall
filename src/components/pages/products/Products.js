import React, { Component } from 'react';
import PageLayout from '../../layout/PageLayout';
import productItems from '../../../data/productItems';
import ProductItems from './ProductItems';
import { groupItems } from './functions';
import './Products.css';

export default class Products extends Component {
  get list() {
    const items = [...productItems].sort((a,b) => b.score - a.score);

    return groupItems(items, 5);
  }

  render() {
    const { list } = this;

    return (
      <PageLayout>
        <div className="products">
          {list.map((items, i) => (
            <ProductItems key={i} items={items}/>
          ))}
        </div>
      </PageLayout>
    )
  }
}
