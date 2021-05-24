import React from 'react';

import 'antd/dist/antd.css';

import HomePage from './Pages/HomePage/HomePage';
import ReservationPage from './Pages/ReservationPage/ReservationPage';
import SummaryPage from './Pages/SummaryPage/SummaryPage';
import ErrorPage from './Pages/404/ErrorPage';

import { Alert } from 'antd';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const { message, description, closable, type, showIcon, style } = useSelector(
    (state) => state.alert
  );

  const { seatsNumber } = useSelector((state) => state.userInput);
  const { userSeats } = useSelector((state) => state.seats);

  return (
    <BrowserRouter>
      {message ? (
        <Alert
          style={style}
          message={message}
          description={description}
          closable={closable}
          type={type}
          showIcon={showIcon}
        />
      ) : null}
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/reservation">
          {seatsNumber ? <ReservationPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/summary">
          {userSeats.length > 0 ? <SummaryPage /> : <Redirect to="/" />}
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
