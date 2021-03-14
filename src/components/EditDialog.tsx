import React, {ReactElement, useCallback} from 'react';
import {Dialog} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {PersonForm} from 'src/components/PersonForm.jsx';
import UpdateIcon from '@material-ui/icons/Update';
import {updateElement} from 'src/elementsService/updateElement.js';
import {RootState} from '../redux/main/types';
import {FlowElement, Node} from 'react-flow-renderer';
import {closeEditDialog, setElements} from '../redux/main/mainActions';

type EditDialogProps = {
  selectedNode?: FlowElement,
}

export const EditDialog = ({selectedNode}: EditDialogProps): ReactElement => {
  const isEditDialogOpen = useSelector((state: RootState) => state.main.isEditDialogOpen);
  const elements = useSelector((state: RootState) => state.main.elements);
  const dispatch = useDispatch();

  const onUpdate = useCallback((person) => {
    // TODO
    // endpoints.updatePerson(person)
    //   .then(() => {
    //     dispatch(setElements(updateElement(elements, person)));
    //   });
    dispatch(closeEditDialog());
  }, [dispatch]);

  return (
    <Dialog open={isEditDialogOpen} onClose={() => dispatch(closeEditDialog())} className='font'>
      <PersonForm isVisible={true} onSubmit={onUpdate} label={'Update personal information'} person={selectedNode?.data} icon={<UpdateIcon />}/>
    </Dialog>
  );
};
