import React, {ReactElement, useCallback, useMemo, useState} from 'react';
import './ControlPanel.scss';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import {PersonForm} from 'src/components/PersonForm.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {removeEdge, setElements} from 'src/redux/main/mainActions';
import {getLayoutedElementsFromLeaves} from 'src/elementsService/getLayoutedElements.js';
import AddIcon from '@material-ui/icons/Add';
import {Person} from '../types';
import {FlowElement, Edge, Node, Elements} from 'react-flow-renderer';
import {State} from '../redux/main/types';
import {createNode} from '../elementsService/createNode';

type ControlPanelProps = {
  selectedNode: FlowElement
}

export const ControlPanel = ({selectedNode} : ControlPanelProps): ReactElement => {
  const elements = useSelector((state: State) => state.main.elements);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();

  const onAddNewPerson = useCallback((person: Person) => {
    const createdNode: Node = createNode(person);
    const newElements: Elements = [...elements];
    newElements.push(createdNode);
    dispatch(setElements(newElements));
  }, [dispatch, elements]);

  const onEdgeRemove = useCallback(() => {
    dispatch(removeEdge(selectedNode as Edge));
  }, [dispatch, selectedNode]);

  const onCleanLayout = () => {
    dispatch(setElements(getLayoutedElementsFromLeaves(elements)));
  };

  const edgeRemovalPanel = useMemo(() => {
    if (!selectedNode) return null;

    if ('source' in selectedNode) return (
      <Button
        variant="contained"
        color="primary"
        className='control-panel__button--full-width control-panel__item'
        onClick={onEdgeRemove}
      >
          Usuń wybraną krawędź
      </Button>
    );
  }, [selectedNode, onEdgeRemove]);

  return (
    <div className='control-panel'>
      <div className='control-panel__buttons control-panel__item'>
        <Button
          variant="contained"
          color="primary"
          className='control-panel__button'
          onClick={onCleanLayout}
        >
          in order
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className='control-panel__button'
          onClick={() => setIsFormVisible(prev => !prev)}
        >
          {isFormVisible ? 'Hide from' : 'Add new'}
        </Button>
      </div>
      {edgeRemovalPanel}
      <PersonForm isVisible={isFormVisible} onSubmit={onAddNewPerson} label={'Add new person'} icon={<AddIcon />}/>
    </div>
  );
};

ControlPanel.propTypes = {
  selectedNode: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.shape({
      name: PropTypes.string,
      lastName: PropTypes.string,
      birth: PropTypes.string,
      death: PropTypes.string,
      id: PropTypes.string,
    }),
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    source: PropTypes.string,
    target: PropTypes.string,
  })

};

ControlPanel.defaultProps = {
  selectedNode: undefined,
};
