import { setAlert, removeAlert } from '../app/slices/alertSlice';

export const displayAlert = (dispatch, history, error) => {
  dispatch(
    setAlert({
      message: 'Błąd',
      description: error.message,
      type: 'error',
    })
  );

  setTimeout(() => {
    dispatch(removeAlert());
    history.push('/');
  }, 5000);
};

export const checkSeat = (index, numberOfSeats, freeSeats) => {
  const pickedSeats = [];

  for (let i = index; i < index + numberOfSeats; i++) {
    if (i === index) {
      pickedSeats.push(freeSeats[i]);
      continue;
    }

    const seat = pickedSeats.length
      ? pickedSeats[pickedSeats.length - 1]
      : freeSeats[i];

    const nextSeat = freeSeats.find(
      (nSeat) =>
        seat &&
        nSeat.cords.y === seat.cords.y &&
        nSeat.cords.x === seat.cords.x + 1
    );
    const prevSeat = freeSeats.find(
      (pSeat) =>
        seat &&
        pSeat.cords.y === seat.cords.y &&
        pSeat.cords.x === seat.cords.x - 1
    );

    if (
      (!nextSeat && pickedSeats.includes(prevSeat)) ||
      (!prevSeat && pickedSeats.includes(nextSeat)) ||
      !seat
    ) {
      pickedSeats.length = 0;
    } else {
      pickedSeats.push(nextSeat ? nextSeat : prevSeat);
    }
  }

  return pickedSeats;
};
