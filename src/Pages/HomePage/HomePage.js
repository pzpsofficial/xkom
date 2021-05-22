import React, { useState } from 'react';

import {
  setSeatsNumber,
  setAreSeatsClose,
} from '../../app/slices/userInputSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputValue, setInputValue] = useState(0);
  const [checkboxState, setCheckboxState] = useState(false);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      if (!inputValue) return;

      dispatch(setSeatsNumber(inputValue));
      dispatch(setAreSeatsClose(checkboxState));

      history.push('/reservation');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (e) => {
    const newState = e.target.checked;
    setCheckboxState(newState);
  };

  const handleInputChange = (e) => {
    const newValue = Number(e.target.value);
    setInputValue(newValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min={0}
          value={inputValue}
          onChange={handleInputChange}
        />
        <input
          type="checkbox"
          value={checkboxState}
          onChange={handleCheckboxChange}
        />
        <button>Wyślij</button>
      </form>
    </div>
  );
};

export default HomePage;
