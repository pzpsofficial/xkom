import React, { useEffect, useState, useCallback } from 'react';

import { setAlert, removeAlert } from '../../app/slices/alertSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  setSeats,
  setUserSeat,
  clearUserSeats,
} from '../../app/slices/seatsDataSlice';
import { useHistory } from 'react-router-dom';

import { Row, Col, Avatar, Space, Button, Spin } from 'antd';

const ReservationPage = () => {
  const dispatch = useDispatch();
  const userInput = useSelector((state) => state.userInput);
  const { seats, userSeats } = useSelector((state) => state.seats);

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const findMatchingSeats = useCallback(
    (numberOfSeats, seats) => {
      try {
        const freeSeats = seats
          .map((row) => row.filter((seat) => seat && !seat.reserved))
          .flat();

        if (freeSeats < numberOfSeats.length) {
          throw new Error('Ups... Przykro nam, nie mamy tylu wolnych miejsc.');
        }

        for (let i = 0; i < numberOfSeats; i++) {
          console.log('siema');

          const seat = freeSeats[i];
          console.log(seat);

          dispatch(setUserSeat(seat));
        }
      } catch (error) {
        dispatch(
          setAlert({
            message: 'Ostrzeżenie',
            description: error.message,
            type: 'warning',
            closable: true,
          })
        );

        setTimeout(() => {
          dispatch(removeAlert());
          history.push('/');
        }, 5000);
      }
    },
    [dispatch, history]
  );

  const handleSubmit = (e) => {
    try {
      if (userInput.seatsNumber !== userSeats.length)
        throw new Error(
          `Hej, powinnienieś zarezerwować następującą ilość miejsc: ${userInput.seatsNumber}. \nJeśli zmieniłeś zdanie wróć na stronę główną.`
        );

      history.push('/summary');
    } catch (error) {
      dispatch(
        setAlert({
          message: 'Ostrzeżenie',
          description: error.message,
          type: 'warning',
          closable: true,
          alertAction: (
            <Button onClick={() => history.push('/')}>Strona główna</Button>
          ),
        })
      );

      setTimeout(() => {
        dispatch(removeAlert());
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        dispatch(clearUserSeats());

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

    if (seats.length <= 0) return;
    findMatchingSeats(userInput.seatsNumber, seats);
  }, [dispatch, seats, userInput.seatsNumber, findMatchingSeats]);

  const markSeatAsTaken = (seat) => {
    try {
      if (!seat) return;
      if (seat.reserved)
        throw new Error('Nie możesz wybrać zarezerwowanego miejsca!');
      if (
        userSeats.length >= userInput.seatsNumber &&
        !userSeats.includes(seat)
      )
        throw new Error('Nie możesz wybrać więcej miejsc niż zadeklarowałeś!');

      dispatch(setUserSeat(seat));
    } catch (error) {
      dispatch(
        setAlert({
          message: 'Błąd',
          description: error.message,
          type: 'error',
        })
      );

      setTimeout(() => {
        dispatch(removeAlert());
      }, 5000);
    }
  };

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
                {column.map((seat) => {
                  const backgroundColor =
                    seat && seat.reserved
                      ? '#434343'
                      : seat && userSeats.includes(seat)
                      ? '#fa8c16'
                      : 'white';

                  return (
                    <Col style={{ marginBottom: '10px' }}>
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
        {isLoading ? <Spin size="large" tip="Ładowanie..." /> : null}
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
