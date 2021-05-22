import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage/HomePage';
import ReservationPage from './Pages/ReservationPage/ReservationPage';
import SummaryPage from './Pages/SummaryPage/SummaryPage';
import ErrorPage from './Pages/404/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/reservation">
          <ReservationPage />
        </Route>
        <Route path="/summary">
          <SummaryPage />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
