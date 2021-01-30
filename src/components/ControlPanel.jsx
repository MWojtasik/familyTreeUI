import React, {useCallback, useMemo, useState} from 'react';
import './ControlPanel.scss';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import {PersonForm} from 'src/components/PersonForm.jsx';
import {endpoints} from 'src/endpoints.js';
import {useDispatch, useSelector} from 'react-redux';
import {addEdge, getData, removeEdge, setElements} from 'src/redux/main/mainActions.ts';
import {getLayoutedElementsFromLeaves} from 'src/elementsService/getLayoutedElements.js';
import AddIcon from '@material-ui/icons/Add';

export function ControlPanel({selectedNode }) {
  const elements = useSelector(state => state.main.elements);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();

  const onAddNewPerson = useCallback((person) => {
    endpoints.addPerson(person)
      .then(() => {
        dispatch(getData());
      });
  }, [dispatch]);

  const onEdgeRemove = useCallback(() => {
    dispatch(removeEdge(selectedNode));
    endpoints.removeConnection(selectedNode.source, selectedNode.target)
      .catch(() => {
        console.error('Something went wrong');
        dispatch(addEdge(selectedNode));
      });
  }, [dispatch, selectedNode]);

  const onCleanLayout = () => {
    dispatch(setElements(getLayoutedElementsFromLeaves(elements)));
  };

  const edgeRemovalPanel = useMemo(() => {
    if (!selectedNode) return null;

    if (selectedNode.source) return (
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
}

ControlPanel.propTypes = {
  selectedNode: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      dateOfBirth: PropTypes.string,
      dateOfDeath: PropTypes.string,
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
