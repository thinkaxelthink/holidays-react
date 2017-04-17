import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import m from 'moment';

import {
  SELECT_YEAR, SELECT_DATE,
  REQUEST_HOLIDAYS, RECEIVE_HOLIDAYS,
  REQUEST_HOLIDAY, RECEIVE_HOLIDAY
} from '../actions';

const DEFAULT_SELECTED_DATE = m(new Date()).format('YYYY-MM-DD');

function selectedYear(state = '2016', action) {
  switch (action.type) {
    case SELECT_YEAR:
      return action.year
    default:
      return state
  }
}

function selectedDate(state = DEFAULT_SELECTED_DATE, action) {
  switch (action.type) {
    case SELECT_DATE:
      return action.date
    default:
      return state
  }
}

function holidays(state = {
  isFetching: false,
  didInvalidate: false,
  items: {}
}, action) {
    switch (action.type) {
      case REQUEST_HOLIDAY:
      case REQUEST_HOLIDAYS:
        return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false
        })
      case RECEIVE_HOLIDAY:
      case RECEIVE_HOLIDAYS:
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          items: action.holidays,
          lastUpdated: action.receivedAt
        })
      default:
        return state
    }
}

function holidaysByYear(state = {}, action) {
  switch (action.type) {
    case RECEIVE_HOLIDAYS:
    case REQUEST_HOLIDAYS:
      return Object.assign({}, state, {
        [action.year]: holidays(state[action.year], action)
      })
    default:
      return state
  }
}

function holidaysByDate(state = {}, action) {
  const defaultState = {
    isFetching: false,
    didInvalidate: false,
    items: []
  };

  switch (action.type) {
    case RECEIVE_HOLIDAY:
    case REQUEST_HOLIDAY:
      return Object.assign({}, state, {
        [action.date]: holidays(state[action.date] || defaultState, action)
      });
    default:
      return state
  }
}

const rootReducer = combineReducers({
  holidaysByYear,
  holidaysByDate,
  selectedYear,
  selectedDate,
  router: routerReducer
});

export default rootReducer;
