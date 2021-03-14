import {createEdge} from 'src/elementsService/createEdge.ts';
import {createNode} from 'src/elementsService/createNode.ts';

const getNodeIndexInElements = (elements, node) => elements.findIndex((element) => element.id === `${node.id}`);

function addNodeToElements(elements, node) {
  const element = createNode(node);
  elements.push(element);
  for (const parent of node.parents) {
    const edge = createEdge({ source: parent, target: node});
    elements.push(edge);
    const isParentAlreadyInElements = ~getNodeIndexInElements(elements, parent);
    if (!isParentAlreadyInElements) {
      addNodeToElements(elements, parent);
    }
  }
}

export function createElementsFromLeaves(leaves) {
  const elements = [];

  for (const leaf of leaves) {
    addNodeToElements(elements, leaf);
  }

  return elements;
}








