import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarSection.css"; 
import { Card } from "react-bootstrap";

// Function to get dynamic minDate for each year
const getMinDate = (selectedDate) => {
  const year = selectedDate.getFullYear();
  return new Date(year, 10, 16); // Month is 0-based (10 = November)
};

// Right side calender section
const CalendarSection = ({ selectedDate, onDateChange }) => {
  return (
    <Card className="shadow-sm p-3 mb-4 bg-white rounded">
      <Card.Body>
        <div className="d-flex justify-content-center">
          <Calendar
            onChange={onDateChange}
            value={selectedDate}
            className="border-0"

            // Calendar should start from 2002
            minDetail="decade"
            minDate={new Date(2002, 0, 1)}
            
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
