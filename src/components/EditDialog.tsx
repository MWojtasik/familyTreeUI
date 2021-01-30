import React, {useCallback} from 'react';
import {Dialog} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {PersonForm} from 'src/components/PersonForm.jsx';
import UpdateIcon from '@material-ui/icons/Update';
import {endpoints} from 'src/endpoints.js';
import {updateElement} from 'src/elementsService/updateElement.js';
import {RootState} from "../redux/main/types";
import {Node} from "react-flow-renderer";
import {closeEditDialog, setElements} from "../redux/main/mainActions";

type Props = {
  selectedNode?: Node,
}

export const EditDialog : React.FC<Props> = ({selectedNode}) => {
  const isEditDialogOpen = useSelector((state: RootState) => state.main.isEditDialogOpen);
  const elements = useSelector((state: RootState) => state.main.elements);
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
      <PersonForm isVisible={true} onSubmit={onUpdate} label={'Update personal information'} person={selectedNode?.data} icon={<UpdateIcon />}/>
    </Dialog>
  );
}
