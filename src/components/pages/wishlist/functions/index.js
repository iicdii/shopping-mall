const getCartData = cartList => {
  const cartData = {};
  for (let item of cartList || []) {
    cartData[item.id] = {
      quantity: 1,
      discountAmount: 0,
      discountRate: 0,
      isSelected: true,
    };
  }

  return cartData;
};

const getPrice = (quantity, price) => {
  return Math.floor(quantity * price);
};

const getSalesPrice = (price, discountAmount, discountRate) => {
  let newPrice = 0;
  if (discountAmount > 0) {
    newPrice = Math.floor(discountAmount);
  } else if (discountRate > 0) {
    if (discountRate > 100) {
      discountRate = 100;
    }
    newPrice = Math.floor(price * (discountRate / 100));
  }

  return newPrice >= 0 ? newPrice : 0;
};

const getOrderPrice = (price, salesPrice) => {
  let newPrice = price - salesPrice;

  return newPrice < 0 ? 0 : newPrice;
};

export { getCartData, getPrice, getSalesPrice, getOrderPrice };
