import React, { PropTypes } from 'react';

const HolidayListItem = ({onClick, name, date}) => (
  <li onClick={onClick}>{name} | {date}</li>
)

HolidayListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export default HolidayListItem;
