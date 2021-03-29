import React, {
  MouseEvent, ReactElement, useRef, useState,
} from 'react';
import './App.styles.scss';
import ReactFlow, {
  Background,
  Connection,
  ConnectionLineType, Controls,
  Edge,
  FlowElement,
  MiniMap,
  OnLoadParams,
} from 'react-flow-renderer';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { StylesProvider } from '@material-ui/styles';
import { State } from '../redux/main/types';
import { createEdge } from '../elementsService/createEdge';
import { addEdge } from '../redux/main/mainActions';
import { store } from '../redux/store';
import { CustomNode } from './CustomNode/CustomNode';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { EditDialog } from './EditDialog/EditDialog';

const onLoad = (reactFlowInstance: OnLoadParams) => {
  reactFlowInstance.fitView();
};

export const App = (): ReactElement => {
  const elements = useSelector((state: State) => state.main.elements);
  const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = useState<FlowElement>();
  const componentRef = useRef();

  const onSelectElement = (event: MouseEvent, element: FlowElement) => {
    setSelectedNode(element);
  };

  const onConnect = (connection: Edge | Connection) => {
    const edge = createEdge(connection);
    dispatch(addEdge(edge));
  };

  return (
    <Provider store={store}>
      <StylesProvider injectFirst>
        <div className="App" ref={componentRef}>
          <ReactFlow
            elements={elements}
            elementsSelectable
            onConnect={onConnect}
            onLoad={onLoad}
            onElementClick={onSelectElement}
            snapToGrid
            snapGrid={[15, 15]}
            connectionLineType={ConnectionLineType.SmoothStep}
            nodeTypes={{ personNode: CustomNode }}
            style={{ background: '#1A192B' }}
          >
            <ControlPanel selectedNode={selectedNode} />
            <MiniMap
              nodeStrokeColor={() => '#000000'}
              nodeColor={() => '#FFFFFF'}
            />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
        <EditDialog selectedNode={selectedNode} />
      </StylesProvider>
    </Provider>
  );
};
