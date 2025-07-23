// src/components/CalendarSection.jsx
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarSection.css"; // Optional: Your custom overrides
import { Card } from "react-bootstrap";

const CalendarSection = ({ selectedDate, onDateChange }) => {
  return (
    <Card className="shadow-sm p-3 mb-4 bg-white rounded">
      <Card.Body>
        <div className="d-flex justify-content-center">
          <Calendar
            onChange={onDateChange}
            value={selectedDate}
            className="border-0"
            tileClassName={({ date }) =>
              date.toDateString() === selectedDate.toDateString() ? "bg-primary text-white rounded" : ""
            }
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CalendarSection;
