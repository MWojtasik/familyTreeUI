import React, { memo, useMemo } from 'react';

import './CustomNode.styles.scss';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { openEditDialog, setElements } from 'src/redux/main/mainActions';
import { removeElement } from 'src/elementsService/removeElement';
import EditIcon from '@material-ui/icons/Edit';
import { State } from '../../redux/main/types';

// eslint-disable-next-line react/display-name
export const CustomNode = memo(({ data } : NodeProps) => {
  const elements = useSelector((state : State) => state.main.elements);
  const {
    name, lastName, birth, death, id,
  } = data;
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
        position={Position.Top}
      />
      <div className="custom-node__action-panel">
        <IconButton
          color="primary"
          onClick={() => dispatch(openEditDialog())}
          size="small"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={onRemove}
          size="small"
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
      <div>
        {`${name} ${lastName}`}
      </div>
      <div className="custom-node__dates">
        {dates}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
});
