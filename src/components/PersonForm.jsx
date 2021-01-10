import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, IconButton, TextField} from '@material-ui/core';
import './PersonForm.scss';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import moment from 'moment';

moment.locale('en');

export function PersonForm({isVisible, onSubmit, label, person, icon}) {
  const isPersonDead = person?.dateOfDeath;
  const [enableDeathPicker, setEnableDeathPicker] = useState(person ? !!isPersonDead : false);
  const [name, setName] = useState(person ? person.name : '');
  const [surname, setSurname] = useState(person ? person.surname : '');
  const [birthDate, setBirthDate] = useState(person ? moment(person.dateOfBirth, 'DD-MM-YYYY') : moment());
  const [deathDate, setDeathDate] = useState(person ? (isPersonDead ? moment(person.dateOfDeath, 'DD-MM-YYYY') : moment()) : moment());
  const transitionClass = isVisible ? '' : 'add-person-form--hidden';

  const onFormSubmit = () => {
    const newPerson = {
      name,
      surname,
      dateOfBirth: birthDate.format('DD-MM-YYYY'),
      dateOfDeath: enableDeathPicker ? deathDate.format('DD-MM-YYYY') : '',
      children: [],
      id: person?.id,
    };
    onSubmit(newPerson);
  };

  return (
    <div className={`add-person-form ${transitionClass}`}>
      <form onSubmit={onFormSubmit}>
        <label className='add-person-form__label'>{label}</label>
        <TextField
          label={'First Name'}
          fullWidth
          value={name}
          className='add-person-form__item'
          onChange={({target}) => setName(target.value)}
        />
        <TextField
          className='add-person-form__item'
          label={'Last Name'}
          value={surname}
          fullWidth
          onChange={({target}) => setSurname(target.value)}
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            value={birthDate}
            className='add-person-form__item'
            onChange={setBirthDate}
            label="Date of birth"
            format="DD-MM-YYYY"
            variant={'inline'}
            fullWidth
          />
          <div className='add-person-form__death-picker'>
            <Checkbox
              checked={enableDeathPicker}
              onChange={({target}) => setEnableDeathPicker(target.checked)}
            />
            <DatePicker
              className='add-person-form__item'
              disabled={!enableDeathPicker}
              value={deathDate}
              fullWidth
              onChange={setDeathDate}
              label="Date of death"
              format="DD-MM-yyyy"
              variant={'inline'}
            />
          </div>
        </MuiPickersUtilsProvider>
        <div className='add-person-form__add-button'>
          <IconButton
            color="secondary"
            onClick={onFormSubmit}
          >
            {icon}
          </IconButton>
        </div>
      </form>

    </div>
  );
}

PersonForm.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  person: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    dateOfBirth: PropTypes.string,
    dateOfDeath: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

PersonForm.defaultProps = {
  person: null,
};
