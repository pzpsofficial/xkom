import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import { findByTestAttr } from './utils/testUtils';

const setup = () => {
  return shallow(<App />);
};

test('checks if app is rendering without error', () => {
  //   const wrapper = setup();
  //   const appComponent = findByTestAttr(wrapper, 'app-component');
  //   expect(appComponent.exists()).toBe(true);
});
