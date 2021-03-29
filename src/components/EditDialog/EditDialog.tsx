import React, { ReactElement, useCallback } from 'react';
import { Dialog } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { PersonForm } from 'src/components/PersonForm/PersonForm';
import UpdateIcon from '@material-ui/icons/Update';
import { FlowElement } from 'react-flow-renderer';
import { RootState } from '../../redux/main/types';
import { closeEditDialog } from '../../redux/main/mainActions';

type EditDialogProps = {
  selectedNode?: FlowElement,
};

export const EditDialog = ({ selectedNode }: EditDialogProps): ReactElement => {
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
    <Dialog open={isEditDialogOpen} onClose={() => dispatch(closeEditDialog())} className="font">
      <PersonForm isVisible onSubmit={onUpdate} label="Update personal information" person={selectedNode?.data} icon={<UpdateIcon />} />
    </Dialog>
  );
};
