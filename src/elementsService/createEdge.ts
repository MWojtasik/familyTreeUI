import {
  ConnectionLineType, ArrowHeadType, Edge, ElementId,
} from 'react-flow-renderer';

type createEdgeArgs = {
  source: ElementId,
  target: ElementId,
};

export const createEdge = ({ source, target }: createEdgeArgs): Edge => ({
  id: `e${source}-${target}`,
  source,
  target,
  type: ConnectionLineType.SmoothStep,
  arrowHeadType: ArrowHeadType.ArrowClosed,
});
