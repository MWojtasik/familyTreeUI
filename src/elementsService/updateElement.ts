import { Elements, Node } from 'react-flow-renderer';

export const updateElement = (elements: Elements, node: Node): Elements => elements
  .map((element) => {
    if (element.id === node.id) {
      return {
        ...element,
        data: {
          ...element.data,
          ...node,
        },
      };
    }
    return element;
  });
