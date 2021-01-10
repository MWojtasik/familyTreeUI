import React, {useEffect, useRef, useState} from 'react';
import './App.scss';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';
import {CustomNode} from 'src/components/CustomNode.jsx';
import {ControlPanel} from 'src/components/ControlPanel.jsx';
import {StylesProvider} from '@material-ui/styles';
import {store} from 'src/redux/store.js';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {addEdge, getData, removeEdge} from 'src/redux/main/mainActions.js';
import {endpoints} from 'src/endpoints.js';
import {createEdge} from 'src/elementsService/createEdge.js';
import {EditDialog} from 'src/components/EditDialog.jsx';

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

export function App() {
  const elements = useSelector(state => state.main.elements);
  const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = useState();
  const componentRef = useRef();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const onSelectElement = (event, element) => {
    setSelectedNode(element);
  };

  const onConnect = (params) => {
    const {source: parentId, target: childId} = params;
    const source = { id: parentId };
    const target = { id: childId };
    const edge = createEdge({source, target});
    dispatch(addEdge(edge));
    endpoints.connect(parentId, childId)
      .catch(() => {
        console.error('Something went wrong');
        dispatch(removeEdge(edge));
      });
  };

  return (
    <Provider store={store}>
      <StylesProvider injectFirst>
        <div className='App' ref={componentRef}>
          <ReactFlow
            elements={elements}
            elementsSelectable={true}
            onConnect={onConnect}
            onLoad={onLoad}
            onElementClick={onSelectElement}
            snapToGrid={true}
            snapGrid={[15, 15]}
            connectionLineType="smoothstep"
            nodeTypes={{personNode: CustomNode}}
            style={{ background: '#1A192B' }}
          >
            <ControlPanel selectedNode={selectedNode}/>
            <MiniMap
              nodeStrokeColor={() => {
                return '#000000';
              }}
              nodeColor={() => {
                return '#FFFFFF';
              }}
            />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
        <EditDialog selectedNode={selectedNode}/>
      </StylesProvider>
    </Provider>
  );
}
