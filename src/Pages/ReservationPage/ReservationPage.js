import React, { useEffect, useState, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { checkSeat, displayAlert } from '../../utils/Functions';
import {
  setSeats,
  setUserSeat,
  clearUserSeats,
} from '../../app/slices/seatsDataSlice';
import { useHistory } from 'react-router-dom';

import AudienceView from '../../components/AudienceView/AudienceView';
import ReservationLegend from '../../components/ReservationLegend/ReservationLegend';

import { Row, Spin } from 'antd';

const ReservationPage = () => {
  const dispatch = useDispatch();
  const userInput = useSelector((state) => state.userInput);
  const { seats, userSeats } = useSelector((state) => state.seats);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

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
      displayAlert(dispatch, error);
    }
  };

  const handleSubmit = () => {
    try {
      if (userInput.seatsNumber !== userSeats.length)
        throw new Error(
          `Hej, powinnienieś zarezerwować następującą ilość miejsc: ${userInput.seatsNumber}. \nJeśli zmieniłeś zdanie wróć na stronę główną.`
        );

      history.push('/summary');
    } catch (error) {
      displayAlert(dispatch, error);
    }
  };

  const findMatchingSeats = useCallback(
    (numberOfSeats, areSeatsClose, seats) => {
      try {
        const freeSeats = seats
          .map((row) => row.filter((seat) => seat && !seat.reserved))
          .flat();

        if (freeSeats.length < numberOfSeats) {
          throw new Error('Ups... Przykro nam, nie mamy tylu wolnych miejsc.');
        }

        if (!areSeatsClose) {
          for (let i = 0; i < numberOfSeats; i++) {
            dispatch(setUserSeat(freeSeats[i]));
          }
        } else {
          for (let i = 0; i < freeSeats.length; i++) {
            const result = checkSeat(i, numberOfSeats, freeSeats);

            if (result.length === numberOfSeats) {
              result.forEach((seat) => dispatch(setUserSeat(seat)));
              break;
            }

            if (i === freeSeats.length - 1 && !result.length) {
              throw new Error('Ups... Nie mamy tylu miejsc w jednym rzędzie!');
            }
          }
        }
      } catch (error) {
        displayAlert(dispatch, error);
      }
    },
    [dispatch]
  );

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
          (_, index) => (sortedData[index] = Array(maxY + 1).fill(undefined))
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
        displayAlert(dispatch, error);
      }
    };

    fetchSeats();

    if (seats.length <= 0) return;
    findMatchingSeats(userInput.seatsNumber, userInput.areSeatsClose, seats);
  }, [dispatch, seats, userInput, findMatchingSeats]);

  return (
    <React.Fragment>
      <Row
        gutter={10}
        justify="center"
        align="middle"
        style={{ minHeight: '85vh', margin: 0 }}
      >
        <AudienceView
          seats={seats}
          userSeats={userSeats}
          markSeatAsTaken={markSeatAsTaken}
        />
        {isLoading ? <Spin size="large" tip="Ładowanie..." /> : null}
      </Row>
      <Row justify="center" align="middle">
        <ReservationLegend submitHandler={handleSubmit} />
      </Row>
    </React.Fragment>
  );
};

export default ReservationPage;
