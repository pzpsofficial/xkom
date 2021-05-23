import React, { Fragment } from 'react';

import { Typography } from 'antd';
const { Paragraph } = Typography;

const ReservationsList = ({ message, seats }) => {
  return (
    <Fragment>
      <Paragraph style={{ fontSize: '35px' }}>{message}</Paragraph>
      {seats.map((seat) => {
        return (
          <Paragraph style={{ fontSize: '35px' }} key={seat.id}>
            - rząd x{seat.cords.x}, miejsce y{seat.cords.y} ({seat.id})
          </Paragraph>
        );
      })}
    </Fragment>
  );
};

export default ReservationsList;
