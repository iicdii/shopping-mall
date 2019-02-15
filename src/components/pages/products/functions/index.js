const groupItems = (items, sliceCount) => {
  const clonedItems = [...items];

  const list = [];
  while (clonedItems.length) {
    list.push(clonedItems.splice(0, sliceCount));
  }

  return list;
};

export { groupItems };
