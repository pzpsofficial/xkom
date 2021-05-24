import reducer, {
  setSeatsNumber,
  setAreSeatsClose,
  clearUserInput,
  initialState,
} from './userInputSlice';

describe('test user input slice', () => {
  test('state is set to initial when undefined', () => {
    const result = reducer(undefined, {});

    expect(result).toStrictEqual(initialState);
  });

  test('sets seatsNumber correctly', () => {
    const payload = 5;

    const result = reducer(initialState, setSeatsNumber(payload));
    expect(result.seatsNumber).toBe(payload);
  });

  test('sets areSeatsClose correctly', () => {
    const payload = true;

    const result = reducer(initialState, setAreSeatsClose(payload));
    expect(result.areSeatsClose).toBe(true);
  });

  test('resets to initialState correctly', () => {
    const result = reducer(undefined, clearUserInput());
    expect(result).toStrictEqual(initialState);
  });
});
