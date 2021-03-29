import React, {
  ReactElement, useCallback, useMemo, useState,
} from 'react';
import './ControlPanel.styles.scss';
import { Button } from '@material-ui/core';
import { PersonForm } from 'src/components/PersonForm/PersonForm';
import { useDispatch, useSelector } from 'react-redux';
import { removeEdge, setElements } from 'src/redux/main/mainActions';
import { getLayoutedElementsFromLeaves } from 'src/elementsService/getLayoutedElements';
import AddIcon from '@material-ui/icons/Add';
import {
  FlowElement, Edge, Node, Elements, isEdge,
} from 'react-flow-renderer';
import { createNode } from 'src/elementsService/createNode';
import { Person } from '../../types';
import { State } from '../../redux/main/types';

type ControlPanelProps = {
  selectedNode: FlowElement
};

export const ControlPanel = ({ selectedNode } : ControlPanelProps): ReactElement => {
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

  const edgeRemovalPanel = useMemo((): ReactElement => {
    if (!selectedNode) return null;
    if (!isEdge(selectedNode)) return null;

    return (
      <Button
        variant="contained"
        color="primary"
        className="control-panel__button--full-width control-panel__item"
        onClick={onEdgeRemove}
      >
        Usuń wybraną krawędź
      </Button>
    );
  }, [selectedNode, onEdgeRemove]);

  return (
    <div className="control-panel">
      <div className="control-panel__buttons control-panel__item">
        <Button
          variant="contained"
          color="primary"
          className="control-panel__button"
          onClick={onCleanLayout}
        >
          in order
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="control-panel__button"
          onClick={() => setIsFormVisible((prev) => !prev)}
        >
          {isFormVisible ? 'Hide from' : 'Add new'}
        </Button>
      </div>
      {edgeRemovalPanel}
      <PersonForm isVisible={isFormVisible} onSubmit={onAddNewPerson} label="Add new person" icon={<AddIcon />} />
    </div>
  );
};
