import {memo, useMemo} from 'react';
import React from 'react';
import './CustomNode.scss';
import {Handle} from 'react-flow-renderer';
import {
  IconButton
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useDispatch, useSelector} from 'react-redux';
import {openEditDialog, setElements} from 'src/redux/main/mainActions.ts';
import {endpoints} from 'src/endpoints.js';
import {removeElement} from 'src/elementsService/removeElement.js';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

export const CustomNode = memo(({data}) => {
  const elements = useSelector(state => state.main.elements);
  const {name, surname, dateOfBirth, dateOfDeath, id} = data;
  const dispatch = useDispatch();

  const deadClassName = dateOfDeath ? 'custom-node--dead' : '';

  const dates = useMemo(() => {
    if (dateOfDeath) return `${dateOfBirth} - ${dateOfDeath}`;
    return `${dateOfBirth}`;
  }, [dateOfBirth, dateOfDeath]);

  const onRemove = () => {
    const updatedElements = removeElement(elements, id);
    endpoints.removePerson(id)
      .then(() => {
        dispatch(setElements(updatedElements));
      });
  };

  return (
    <div className={`custom-node ${deadClassName}`}>
      <Handle
        type="target"
        position='top'
      />
      <div className='custom-node__action-panel'>
        <IconButton
          color="primary"
          onClick={() => dispatch(openEditDialog())}
          size={'small'}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={onRemove}
          size={'small'}
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
      <div>
        {`${name} ${surname}`}
      </div>
      <div className='custom-node__dates'>
        {dates}
      </div>
      <Handle
        type="source"
        position='bottom'
      />
    </div>
  );
});

CustomNode.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    dateOfBirth: PropTypes.string,
    dateOfDeath: PropTypes.string,
    id: PropTypes.string,
  }),
};

CustomNode.defaultProps = {
  data: {},
};
