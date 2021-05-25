import { findByTestAttr } from '../../utils/testUtils';
import { mount } from 'enzyme';
import ReservationPage from './ReservationPage';
import { reducer } from './../../app/store';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const setup = (preloadedState = {}) => {
  const store = configureStore({ reducer, preloadedState });

  return mount(
    <Provider store={store}>
      <ReservationPage />
    </Provider>
  );
};

describe('test reservationPage', () => {
  test('renders without errors', () => {
    const wrapper = setup();
    const reservationPage = findByTestAttr(wrapper, 'reservation-page');
    expect(reservationPage.exists()).toBe(true);
  });
});
