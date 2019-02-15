const getCartData = cartList => {
  const cartData = {};
  for (let item of cartList || []) {
    cartData[item.id] = {
      quantity: 1,
      salesPrice: 0,
      isSelected: true,
    };
  }

  return cartData;
};

export { getCartData };
