import { setAlert, removeAlert, initialState } from './alertSlice';
import reducer from './alertSlice';

describe('test alert slice', () => {
  test('state is set to initial when undefined', () => {
    const result = reducer(undefined, {});
    expect(result).toStrictEqual(initialState);
  });

  test('alert is set correctly', () => {
    const payload = {
      message: 'Error',
      description: 'Coś poszło nie tak...',
      type: 'error',
      closable: false,
    };

    const result = reducer(initialState, setAlert(payload));
    expect(result.message).toStrictEqual(payload.message);
    expect(result.description).toStrictEqual(payload.description);
    expect(result.type).toStrictEqual(payload.type);
    expect(result.closable).toStrictEqual(payload.closable);
  });

  test('alert is removed correctly', () => {
    const result = reducer(initialState, removeAlert());
    expect(result).toStrictEqual(initialState);
  });
});
