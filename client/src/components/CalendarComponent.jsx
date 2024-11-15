import { useState } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({ startDate, endDate }) => {
  const [formattedStartDate, setFormattedStartDate] = useState(null);
  const [formattedEndDate, setFormattedEndDate] = useState(null);

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const handleDateChange = (date) => {
    if (!startDate) {
      setFormattedStartDate(formatDate(date));
    } else if (!endDate) {
      setFormattedEndDate(formatDate(date));
    }
  };

  return (
    <div>
      <Calendar
        calendarType="US"
        onChange={handleDateChange}
        value={startDate ? new Date(startDate) : new Date()}
      />
    </div>
  );
};

CalendarComponent.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default CalendarComponent;
