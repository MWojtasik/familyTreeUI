import { Elements, isNode } from 'react-flow-renderer';

export const removeElement = (elements: Elements, elementIdToRemove: string) : Elements => elements
  .filter((element) => {
    if (isNode(element)) return element.id !== elementIdToRemove;
    return element.source !== elementIdToRemove && element.target !== elementIdToRemove;
  });
