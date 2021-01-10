export function createEdge({source, target}) {
  const { id: sourceId } = source;
  const { id: targetId } = target;
  return {
    id: `e${sourceId}-${targetId}`,
    source: `${sourceId}`,
    target: `${targetId}`,
    type: 'smoothstep',
    arrowHeadType: 'arrowclosed',
  };
}
