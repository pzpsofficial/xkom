import { findByTestAttr } from '../../utils/testUtils';
import { mount } from 'enzyme';
import HomePage from './HomePage';
import { reducer } from './../../app/store';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const setup = (preloadedState = {}) => {
  const store = configureStore({ reducer, preloadedState });

  return mount(
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

describe('test homePage', () => {
  test('renders without errors', () => {
    const wrapper = setup();
    const homePage = findByTestAttr(wrapper, 'homepage');
    expect(homePage.exists()).toBe(true);
  });
});
