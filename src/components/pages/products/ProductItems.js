import React, { PureComponent } from 'react';
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
      <div className="product-items">
        {items.map(item => (
          <ProductItem key={item.id} item={item} cart={cart} />
        ))}
      </div>
    );
  }
}

export default withCartContext(ProductItems);
