import React, { PureComponent } from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';

export default class ProductItems extends PureComponent {
  static propTypes = {
    items: PropTypes.array,
  };

  render() {
    const { items } = this.props;

    return (
      <Row gutter={20} className="product-items">
        {items.map(item => (
          <ProductItem key={item.id} item={item} />
        ))}
      </Row>
    );
  }
}
