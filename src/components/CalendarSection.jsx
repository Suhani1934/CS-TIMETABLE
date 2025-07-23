import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarSection = ({ selectedDate, onDateChange }) => {
  return (
    <div className="mb-4">
      <h5 className="mb-3 text-primary fw-bold">Select Date</h5>
      <div className="border rounded shadow-sm p-2 bg-white">
        <Calendar
          onChange={onDateChange}
          value={selectedDate}
          className="w-100"
          tileClassName={({ date }) =>
            date.toDateString() === selectedDate.toDateString() ? "bg-primary text-white" : ""
          }
        />
      </div>
    </div>
  );
};

export default CalendarSection;
