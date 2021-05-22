import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './Pages/HomePage/HomePage';
import ReservationPage from './Pages/ReservationPage/ReservationPage';
import SummaryPage from './Pages/SummaryPage/SummaryPage';
import ErrorPage from './Pages/404/ErrorPage';
import { Alert } from 'antd';

function App() {
  const { message, description, closable, type, showIcon, style, alertAction } =
    useSelector((state) => state.alert);

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
          action={alertAction}
        />
      ) : null}
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
