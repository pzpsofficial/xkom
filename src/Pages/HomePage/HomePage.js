import React, { useState } from 'react';

import {
  setSeatsNumber,
  setAreSeatsClose,
} from '../../app/slices/userInputSlice';
import { setAlert, removeAlert } from '../../app/slices/alertSlice';

import HomePageForm from '../../components/HomePageForm/HomePageForm';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row } from 'antd';

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputValue, setInputValue] = useState(0);
  const [checkboxState, setCheckboxState] = useState(false);

  const handleSubmit = () => {
    try {
      dispatch(setSeatsNumber(inputValue));
      dispatch(setAreSeatsClose(checkboxState));
      history.push('/reservation');
    } catch (error) {
      dispatch(
        setAlert({
          message: 'Błąd',
          description: 'Ups... Coś poszło nie tak. Spróbuj ponownie później',
        })
      );

      setTimeout(() => {
        dispatch(removeAlert());
      }, 5000);
    }
  };

  const handleCheckboxChange = (value) => {
    const newState = value.target.checked;
    setCheckboxState(newState);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  return (
    <Row
      data-test="homepage"
      style={{ minHeight: '100vh' }}
      align="middle"
      justify="center"
    >
      <HomePageForm
        submitHandler={handleSubmit}
        checkboxChangeHandler={handleCheckboxChange}
        inputChangeHandler={handleInputChange}
        inputValue={inputValue}
        checkboxState={checkboxState}
      />
    </Row>
  );
};

export default HomePage;
