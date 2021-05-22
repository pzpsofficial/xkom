import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSeats } from '../../app/slices/seatsDataSlice';

import { Row, Col, Avatar } from 'antd';

const ReservationPage = () => {
  const dispatch = useDispatch();
  const userInput = useSelector((state) => state.userInput);
  const { seats } = useSelector((state) => state.seats);

  useEffect(() => {
    const fetchSeats = async () => {
      if (seats.length > 0) return;

      const { data } = await axios(
        `${process.env.REACT_APP_API_ENDPOINT}/seats`
      );

      const maxY = Math.max(...data.map((seat) => seat.cords.y));
      const maxX = Math.max(...data.map((seat) => seat.cords.x));

      const sortedData = Array(maxX + 1).fill(undefined);

      sortedData.forEach(
        (_, index) => (sortedData[index] = Array(maxY + 1).fill(undefined, 0)),
        0
      );

      data.forEach((seat) => {
        const columnIndex = seat.cords.x;
        const rowIndex = seat.cords.y;
        sortedData[columnIndex][rowIndex] = seat;
      });

      console.log(sortedData);

      dispatch(setSeats(sortedData));
    };

    fetchSeats();
  }, [dispatch, seats]);

  return (
    <Row
      gutter={10}
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}
    >
      {seats.map((column) => (
        <Col>
          {column.map((seat) => (
            <Col style={{ marginBottom: '10px' }}>
              {seat ? (
                <Avatar
                  shape="square"
                  size="large"
                  style={{
                    backgroundColor: `${seat.reserved ? '#1f1f1f' : 'white'}`,
                    border: '1px solid black',
                  }}
                />
              ) : (
                <Avatar
                  shape="square"
                  size="large"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid transparent',
                  }}
                />
              )}
            </Col>
          ))}
        </Col>
      ))}
    </Row>
  );
};

export default ReservationPage;
