import dagre from 'dagre';
import { Elements, isNode, Position } from 'react-flow-renderer';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElementsFromLeaves = (elements: Elements, direction = 'TB'): Elements => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });
  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: 250, height: 150 });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });
  dagre.layout(dagreGraph);
  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? Position.Left : Position.Top;
      el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
      // unfortunately we need this little hack to pass a slighltiy different position
      // in order to notify react flow about the change
      el.position = {
        x: nodeWithPosition.x + Math.random() / 1000,
        y: nodeWithPosition.y,
      };
    }
    return el;
  });
};
