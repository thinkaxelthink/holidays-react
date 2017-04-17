import map from 'lodash/map';
import m from 'moment';

import React, { Component, PropTypes } from 'react';
import { goBack } from 'react-router-redux';
import { connect } from 'react-redux';

import { fetchHoliday, selectDate } from '../state/actions';

class HolidayDetails extends Component {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: {
          date: selectedDate
        }
      }
    } = this.props;

    dispatch(selectDate(selectedDate));
    dispatch(fetchHoliday(selectedDate));
  }

  render() {
    const { holidays, selectedDate } = this.props;
    return (
      <div className="detailview">
        <h1 className="detailview__header">{ m(selectedDate).format('ddd, MMM Do YYYY') }</h1>
        <a className="detailview__back-button" href="/">back</a>
      {map(holidays, (holiday, i) =>
          <a href={ `https://www.google.com/?q=${encodeURI(holiday.name)}` } className="detailview__holiday" key={i}>{holiday.name}</a>
      )}
      </div>
    );
  }
}

HolidayDetails.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  holidays: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedDate, holidaysByDate } = state;
  const {
    items: holidays,
    isFetching,
    lastUpdated
  } = holidaysByDate[selectedDate] || {
    isFetching: true,
    items: []
  };

  return {
    selectedDate,
    holidays,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(HolidayDetails);
