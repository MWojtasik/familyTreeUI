export const updateElement = (elements, node) => {
  return elements.map((element) => {
    if (element.id === node.id) return {
      ...element,
      data: {
        ...element.data,
        ...node,
      }
    };
    return element;
  });
};
