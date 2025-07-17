import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { format } from "date-fns";
import dummyClasses from "../../data/classData";

const localizer = momentLocalizer(moment);

const FacultyHome = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [classesOnDate, setClassesOnDate] = useState([]);

  // Convert class data to react-big-calendar event format
  const convertToCalendarEvents = (classes) => {
    return classes.map((cls) => {
      const [startTime, endTime] = cls.time.split(" - ");
      const start = new Date(`${cls.date} ${startTime}`);
      const end = new Date(`${cls.date} ${endTime}`);
      return {
        id: cls.id,
        title: cls.subject,
        start,
        end,
      };
    });
  };

  useEffect(() => {
    const events = convertToCalendarEvents(dummyClasses);
    setCalendarEvents(events);

    const today = format(new Date(), "yyyy-MM-dd");
    const todayClasses = dummyClasses.filter((cls) => cls.date === today);
    setClassesOnDate(todayClasses);
  }, []);

  const handleDateSelect = (slotInfo) => {
    const clickedDate = format(slotInfo.start, "yyyy-MM-dd");
    setSelectedDate(clickedDate);

    const filtered = dummyClasses.filter((cls) => cls.date === clickedDate);
    setClassesOnDate(filtered);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left column: Calendar */}
        <div className="col-7 mb-4">
          <h4 className="mb-3 text-primary fw-bold">Class Calendar</h4>
          <div className="border rounded shadow-sm p-2 bg-white">
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              selectable
              onSelectSlot={handleDateSelect}
            />
          </div>
        </div>

        {/* Right column: Classes on selected date */}
        <div className="col-5">
          <h4 className="mb-3 text-success fw-bold">
            Classes on {selectedDate}
          </h4>
          {classesOnDate.length === 0 ? (
            <div className="alert alert-warning">No classes on this date.</div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {classesOnDate.map((cls) => (
                <div key={cls.id} className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{cls.subject}</h5>
                    <p className="card-text mb-1">
                      <strong>Time:</strong> {cls.time}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Room:</strong> {cls.room}
                    </p>
                    <p className="card-text mb-0">
                      <strong>Faculty:</strong> {cls.faculty}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyHome;
