import React from 'react';

import { Space, Button, Avatar } from 'antd';

const ReservationLegend = ({ submitHandler }) => {
  return (
    <Space size={30} justify="center">
      <Space align="baseline">
        <Avatar
          shape="square"
          size="large"
          style={{
            backgroundColor: 'white',
            border: '1px solid',
            borderColor: 'black',
          }}
        />
        <p>Miejsca dostępne</p>
      </Space>
      <Space align="baseline">
        <Avatar
          shape="square"
          size="large"
          style={{
            backgroundColor: '#434343',
            border: '1px solid',
            borderColor: 'black',
          }}
        />
        <p>Miejsca zarezerwowane</p>
      </Space>
      <Space align="baseline">
        <Avatar
          shape="square"
          size="large"
          style={{
            backgroundColor: '#fa8c16',
            border: '1px solid',
            borderColor: 'black',
          }}
        />
        <p>Twój wybór</p>
      </Space>
      <Button onClick={submitHandler} size="large" block={true}>
        Rezerwuj
      </Button>
    </Space>
  );
};

export default ReservationLegend;
