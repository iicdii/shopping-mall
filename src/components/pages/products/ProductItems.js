import React, { PureComponent } from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';
import { withCartContext } from '../../../contexts/CartContext';

class ProductItems extends PureComponent {
  static propTypes = {
    items: PropTypes.array,
    cart: PropTypes.object.isRequired,
  };

  render() {
    const { items, cart } = this.props;

    return (
      <Row gutter={20} className="product-items">
        {items.map(item => (
          <ProductItem key={item.id} item={item} cart={cart} />
        ))}
      </Row>
    );
  }
}

export default withCartContext(ProductItems);
