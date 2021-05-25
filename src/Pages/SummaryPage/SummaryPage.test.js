import { findByTestAttr } from '../../utils/testUtils';
import { mount } from 'enzyme';
import SummaryPage from './SummaryPage';
import { reducer } from './../../app/store';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const setup = (preloadedState = {}) => {
  const store = configureStore({ reducer, preloadedState });

  return mount(
    <Provider store={store}>
      <SummaryPage />
    </Provider>
  );
};

describe('test reservationPage', () => {
  test('renders without errors', () => {
    const wrapper = setup();
    const summaryPage = findByTestAttr(wrapper, 'summary-page');
    expect(summaryPage.exists()).toBe(true);
  });
});
