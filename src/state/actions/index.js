import flatMap from 'lodash/flatMap';
import { API_HOST, CLIENT_KEY } from '../../constants/api';

export const REQUEST_HOLIDAYS = 'REQUEST_HOLIDAYS';
export const RECEIVE_HOLIDAYS = 'RECEIVE_HOLIDAYS';
export const REQUEST_HOLIDAY = 'REQUEST_HOLIDAY';
export const RECEIVE_HOLIDAY = 'RECEIVE_HOLIDAY';
export const SELECT_YEAR = 'SELECT_YEAR';
export const SELECT_DATE = 'SELECT_DATE';

export function selectYear(year) {
  return {
    type: SELECT_YEAR,
    year
  }
}

export function selectDate(date) {
  return {
    type: SELECT_DATE,
    date
  }
}

function requestHolidays(year) {
  return {
    type: REQUEST_HOLIDAYS,
    year
  }
}

function receiveHolidays(year, json) {
  return {
    type: RECEIVE_HOLIDAYS,
    year,
    holidays: json.holidays,
    receivedAt: Date.now()
  }
}


function requestHoliday(date) {
  return {
    type: REQUEST_HOLIDAY,
    date
  }
}

function receiveHoliday(date, json) {

  return {
    type: RECEIVE_HOLIDAY,
    date,
    holidays: json.holidays,
    receivedAt: Date.now()
  }
}

export function fetchHolidays(year = '2016') {
  return dispatch => {
    dispatch(requestHolidays(year));
    return fetch(`${API_HOST}holidays?key=${CLIENT_KEY}&country=US&year=${year}`)
      .then(response => response.json())
      .then(json => dispatch(receiveHolidays(year, json)));
  }
}

export function fetchHoliday(date) {
  return dispatch => {
    const params = date.split('-');

    dispatch(requestHoliday(date));
    return fetch(`${API_HOST}holidays?key=${CLIENT_KEY}&country=US&year=${params[0]}&month=${params[1]}&day=${params[2]}`)
    .then(response => response.json())
    .then(json => dispatch(receiveHoliday(date, json)))
  }
}
