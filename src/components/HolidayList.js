import React, { PropTypes, Component } from 'react';
import m from 'moment';
import map from 'lodash/map';

function HolidayList(props) {
  return (
    <ul className="listview__list">
      {map(props.holidays, (holiday, date) =>
        <li key={date} className="listview__list-item">
          <a className="listview__link" href={ `/holiday/${date}` }>{m(date).format('ddd, MMM Do')}</a>
        </li>
      )}
    </ul>
  );
}

HolidayList.propTypes = {
  holidays: PropTypes.object.isRequired,
}

export default HolidayList;
