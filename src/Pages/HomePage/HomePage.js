import React, { useState } from 'react';

import {
  setSeatsNumber,
  setAreSeatsClose,
} from '../../app/slices/userInputSlice';
import { setAlert, removeAlert } from '../../app/slices/alertSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button, Row, Form, Checkbox, InputNumber } from 'antd';

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
    <Row style={{ minHeight: '100vh' }} align="middle" justify={'center'}>
      <Form onFinish={handleSubmit} colon={false}>
        <Form.Item
          label="Liczba miejsc: "
          rules={[
            {
              required: true,
              message: 'Podaj proszę liczbę!',
            },
          ]}
          name="seatsNumber"
        >
          <InputNumber
            size="medium"
            style={{ width: '100%' }}
            value={inputValue}
            onChange={handleInputChange}
            min={1}
            max={100}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox checked={checkboxState} onChange={handleCheckboxChange}>
            Czy miejsca mają być obok siebie?
          </Checkbox>
        </Form.Item>
        <Button htmlType="submit" size="large" block={true}>
          Wybierz miejsca
        </Button>
      </Form>
    </Row>
  );
};

export default HomePage;
