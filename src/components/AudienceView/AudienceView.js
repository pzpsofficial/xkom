import React, { Fragment } from 'react';

import { getSeatStyles } from '../../utils/Functions';

import { Col, Avatar } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const AudienceView = ({ seats, userSeats, markSeatAsTaken }) => {
  return (
    <Fragment>
      {seats.length > 0
        ? seats.map((column) => (
            <Col key={uuidv4()}>
              {column.map((seat) => {
                const seatStyles = getSeatStyles(seat, userSeats);

                return (
                  <Col style={{ marginBottom: '10px' }} key={uuidv4()}>
                    <Avatar
                      onClick={() => markSeatAsTaken(seat)}
                      shape="square"
                      size="large"
                      style={seatStyles}
                    />
                  </Col>
                );
              })}
            </Col>
          ))
        : null}
    </Fragment>
  );
};

export default AudienceView;
