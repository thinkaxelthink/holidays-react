import isEmpty from 'lodash/isEmpty';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchHolidays, selectYear } from '../state/actions';
import Picker from '../components/Picker';
import HolidayList from '../components/HolidayList';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedYear } = this.props;

    dispatch(fetchHolidays(selectedYear));
  }

  handleChange(nextYear) {
    this.props.dispatch(selectYear(nextYear));
    this.props.dispatch(fetchHolidays(nextYear));
  }

  render() {
    const { selectedYear, holidays } = this.props;

    return (
      <div className="listview">
        <Picker value={ `Holidays for` }
          onChange={this.handleChange}
          options={[ '2016', '2015' ]} />
        {!isEmpty(holidays) &&
          <HolidayList holidays={holidays} />
        }
      </div>
    );
  }
}

App.propTypes = {
  selectedYear: PropTypes.string.isRequired,
  holidays: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedYear, holidaysByYear } = state;
  const {
    items: holidays,
    isFetching,
    lastUpdated
  } = holidaysByYear[selectedYear] || {
    isFetching: true,
    items: {}
  };

  return {
    selectedYear,
    holidays,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(App)
