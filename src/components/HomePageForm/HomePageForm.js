import React from 'react';

import { Button, Form, Checkbox, InputNumber } from 'antd';

const HomePageForm = ({
  submitHandler,
  checkboxChangeHandler,
  inputChangeHandler,
  inputValue,
  checkboxState,
}) => {
  return (
    <Form onFinish={submitHandler} colon={false} data-test="homepage-form">
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
          onChange={inputChangeHandler}
          min={1}
          max={100}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          data-test="checkbox"
          checked={checkboxState}
          onChange={checkboxChangeHandler}
        >
          Czy miejsca mają być obok siebie?
        </Checkbox>
      </Form.Item>
      <Button htmlType="submit" size="large" block={true}>
        Wybierz miejsca
      </Button>
    </Form>
  );
};

export default HomePageForm;
