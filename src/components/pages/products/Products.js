import React, { Component } from 'react';
import PageLayout from '../../layout/PageLayout';
import productItems from '../../../data/productItems';
import ProductItems from './ProductItems';
import { groupItems } from './functions';
import './Products.css';

class Products extends Component {
  get list() {
    // 노출도 순으로 내림차순 정렬
    const items = [...productItems].sort((a, b) => b.score - a.score);

    return groupItems(items, 5);
  }

  render() {
    const { list } = this;

    return (
      <PageLayout>
        <div className="products">
          {list.map((items, i) => (
            <ProductItems key={i} items={items} />
          ))}
        </div>
      </PageLayout>
    );
  }
}

export default Products;
