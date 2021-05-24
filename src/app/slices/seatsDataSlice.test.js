import reducer, {
  setSeats,
  insertNewlyReservedSeats,
  clearUserSeats,
  initialState,
} from './seatsDataSlice';

const exampleData = [
  {
    id: 's01',
    cords: {
      x: 0,
      y: 1,
    },
    reserved: false,
  },
  {
    id: 's02',
    cords: {
      x: 0,
      y: 2,
    },
    reserved: true,
  },
];

const exampleDataTwo = {
  seats: [
    [
      {
        id: 's01',
        cords: {
          x: 0,
          y: 1,
        },
        reserved: false,
      },
    ],
    [
      {
        id: 's11',
        cords: {
          x: 0,
          y: 2,
        },
        reserved: false,
      },
    ],
  ],
  userSeats: [],
};

describe('test seats data slice', () => {
  test('state is set to initial when undefined', () => {
    const result = reducer(undefined, {});

    expect(result).toStrictEqual(initialState);
  });

  test('seats are set correctly', () => {
    const payload = exampleData;

    const result = reducer(initialState, setSeats(payload));
    expect(result.seats).toStrictEqual(payload);
  });

  test('seats are reserved and inserted correctly', () => {
    const payload = [exampleData[0]];

    const result = reducer(exampleDataTwo, insertNewlyReservedSeats(payload));
    expect(result.userSeats).toStrictEqual(payload);
    expect(
      result.seats.find((seat) => seat.id === payload.id)[0]
    ).toStrictEqual({
      ...payload[0],
      reserved: true,
    });
  });

  test('user seats are cleared correctly', () => {
    const result = reducer(exampleDataTwo, clearUserSeats());

    expect(result.userSeats).toStrictEqual([]);
  });
});
