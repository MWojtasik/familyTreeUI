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
import {removeElement} from 'src/elementsService/removeElement.js';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

export const CustomNode = memo(({data}) => {
  const elements = useSelector(state => state.main.elements);
  const {name, lastName, birth, death, id} = data;
  const dispatch = useDispatch();

  const deadClassName = death ? 'custom-node--dead' : '';

  const dates = useMemo(() => {
    if (death) return `${birth} - ${death}`;
    return `${birth}`;
  }, [birth, death]);

  const onRemove = () => {
    const updatedElements = removeElement(elements, id);
    dispatch(setElements(updatedElements));
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
        {`${name} ${lastName}`}
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
    lastName: PropTypes.string,
    birth: PropTypes.string,
    death: PropTypes.string,
    id: PropTypes.string,
  }),
};

CustomNode.defaultProps = {
  data: {},
};
