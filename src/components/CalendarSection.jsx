import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup moment as the calendar localizer
const localizer = momentLocalizer(moment);

const CalendarSection = ({ onSelectDate }) => {
  // Handle slot selection (when a user clicks on a date)
  const handleDateClick = (slotInfo) => {
    const clickedDate = slotInfo.start || slotInfo; // Ensure it's a Date object
    onSelectDate(clickedDate); // Pass it to parent
  };

  return (
    <div className="col-md-7 mb-4">
      <h4 className="mb-3 text-primary fw-bold">Class Calendar</h4>
      <div className="border rounded shadow-sm p-2 bg-white">
        <Calendar
          localizer={localizer}
          events={[]} // No events needed for day selection
          startAccessor="start"
          endAccessor="end"
          selectable
          popup
          style={{ height: 700 }}
          onSelectSlot={handleDateClick}
          onSelectEvent={handleDateClick}
        />
      </div>
    </div>
  );
};

export default CalendarSection;
