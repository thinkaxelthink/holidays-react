import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

import { configureStore, history } from '../state/configureStore';
import Root from './Root';
import HolidayDetails from './HolidayDetails';

import style from '../../styles/index.scss';

const store = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Root}/>
          <Route path="/holiday/:date" component={HolidayDetails} />
        </div>
      </ConnectedRouter>
    </Provider>
  )
}
