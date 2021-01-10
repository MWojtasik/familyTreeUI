import React, {useCallback} from 'react';
import {closeEditDialog, setElements} from 'src/redux/main/mainActions.js';
import {Dialog} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {PersonForm} from 'src/components/PersonForm.jsx';
import UpdateIcon from '@material-ui/icons/Update';
import {endpoints} from 'src/endpoints.js';
import {updateElement} from 'src/elementsService/updateElement.js';

export function EditDialog({selectedNode}) {
  const isEditDialogOpen = useSelector(state => state.main.isEditDialogOpen);
  const elements = useSelector(state => state.main.elements);
  const dispatch = useDispatch();

  const onUpdate = useCallback((person) => {
    endpoints.updatePerson(person)
      .then(() => {
        dispatch(setElements(updateElement(elements, person)));
      });
    dispatch(closeEditDialog());
  }, [dispatch, elements]);

  return (
    <Dialog open={isEditDialogOpen} onClose={() => dispatch(closeEditDialog())} className='font'>
      <PersonForm isVisible={true} onSubmit={onUpdate} label={'Update personal information'} person={selectedNode.data} icon={<UpdateIcon />}/>
    </Dialog>
  );
}

EditDialog.propTypes = {
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

EditDialog.defaultProps = {
  selectedNode: {},
};
