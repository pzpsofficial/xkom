import React, { useEffect, useState } from 'react';

import { setAlert, removeAlert } from '../../app/slices/alertSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSeats } from '../../app/slices/seatsDataSlice';
import { useHistory } from 'react-router-dom';

import { Row, Col, Avatar, Space, Button, Spin } from 'antd';

const ReservationPage = () => {
  const dispatch = useDispatch();
  const userInput = useSelector((state) => state.userInput);
  const { seats } = useSelector((state) => state.seats);

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    try {
      history.push('/summary');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        if (seats.length > 0) return;

        setIsLoading(true);

        const { data } = await axios(
          `${process.env.REACT_APP_API_ENDPOINT}/seats`
        );

        const maxY = Math.max(...data.map((seat) => seat.cords.y));
        const maxX = Math.max(...data.map((seat) => seat.cords.x));

        const sortedData = Array(maxX + 1).fill(undefined);

        sortedData.forEach(
          (_, index) =>
            (sortedData[index] = Array(maxY + 1).fill(undefined, 0)),
          0
        );

        data.forEach((seat) => {
          const columnIndex = seat.cords.x;
          const rowIndex = seat.cords.y;
          sortedData[columnIndex][rowIndex] = seat;
        });

        setIsLoading(false);
        dispatch(setSeats(sortedData));
      } catch (error) {
        setIsLoading(false);
        dispatch(
          setAlert({
            message: 'Błąd',
            description: 'Ups... Coś poszło nie tak. Spróbuj ponownie później',
            type: 'error',
          })
        );

        setTimeout(() => {
          dispatch(removeAlert());
        }, 5000);
      }
    };

    fetchSeats();
  }, [dispatch, seats]);

  return (
    <React.Fragment>
      <Row
        gutter={10}
        justify="center"
        align="middle"
        style={{ minHeight: '85vh', margin: 0 }}
      >
        {seats.length > 0
          ? seats.map((column) => (
              <Col>
                {column.map((seat) => (
                  <Col style={{ marginBottom: '10px' }}>
                    <Avatar
                      shape="square"
                      size="large"
                      style={{
                        backgroundColor: `${
                          seat && seat.reserved ? '#434343' : 'white'
                        }`,
                        border: '1px solid',
                        borderColor: `${seat ? 'black' : 'transparent'}`,
                      }}
                    />
                  </Col>
                ))}
              </Col>
            ))
          : null}
        {isLoading ? (
          <Spin size="large" tip="Ładowanie..." spinning="true" />
        ) : null}
      </Row>
      <Row justify="center" align="middle">
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
          <Button onClick={handleSubmit} size="large" block={true}>
            Rezerwuj
          </Button>
        </Space>
      </Row>
    </React.Fragment>
  );
};

export default ReservationPage;
