import React, { Fragment } from 'react';

import { Col, Avatar } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const AudienceView = ({ seats, userSeats, markSeatAsTaken }) => {
  return (
    <Fragment>
      {seats.length > 0
        ? seats.map((column) => (
            <Col key={uuidv4()}>
              {column.map((seat) => {
                const backgroundColor =
                  seat && seat.reserved
                    ? '#434343'
                    : seat && userSeats.includes(seat)
                    ? '#fa8c16'
                    : 'white';

                return (
                  <Col style={{ marginBottom: '10px' }} key={uuidv4()}>
                    <Avatar
                      onClick={() => markSeatAsTaken(seat)}
                      shape="square"
                      size="large"
                      style={{
                        backgroundColor: backgroundColor,
                        border: '1px solid',
                        borderColor: `${seat ? 'black' : 'transparent'}`,
                      }}
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
