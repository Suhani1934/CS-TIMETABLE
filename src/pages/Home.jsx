// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { format } from "date-fns";

const localizer = momentLocalizer(moment);

// Normalize to dd-MM-yyyy
const normalizeDate = (input) => {
  if (!input) return "";
  const parts = input.split(/[-/]/); // handles both "-" and "/"
  if (parts.length !== 3) return "";
  let [day, month, year] = parts;
  day = day.padStart(2, "0");
  month = month.padStart(2, "0");
  return `${day}-${month}-${year}`;
};

// Convert date & time to JavaScript Date
const parseDateTime = (dateStr, timeStr) => {
  const normalized = normalizeDate(dateStr);
  if (!normalized || !timeStr) return null;

  const [day, month, year] = normalized.split("-");
  const [startTime] = timeStr.split(" - ");
  const dateTimeStr = `${year}-${month}-${day} ${startTime}`;
  return new Date(dateTimeStr);
};

const Home = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "dd-MM-yyyy"));
  const [classesOnDate, setClassesOnDate] = useState([]);
  const [allClasses, setAllClasses] = useState([]);

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      const SHEET_ID = import.meta.env.VITE_SHEET_ID;
      const API_KEY = import.meta.env.VITE_GOOGLE_SHEET_API_KEY;
      const SHEET_NAME = import.meta.env.VITE_SHEET_NAME;

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values || data.values.length === 0) {
          console.warn("No data found in sheet.");
          return;
        }

        const headers = data.values[0];
        const rows = data.values.slice(1);

        const jsonData = rows.map((row) => {
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index] || "";
          });
          return rowData;
        });

        setAllClasses(jsonData);

        const today = format(new Date(), "dd-MM-yyyy");
        const todayClasses = jsonData.filter((cls) => normalizeDate(cls.date) === today);
        setClassesOnDate(todayClasses);

        // Prepare calendar events
        const events = jsonData
          .filter((cls) => cls.time && cls.date)
          .map((cls) => {
            const [startStr, endStr] = cls.time.split(" - ");
            const start = parseDateTime(cls.date, startStr);
            const end = parseDateTime(cls.date, endStr);

            if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
              return null;
            }

            return {
              id: cls.id,
              title: cls.subject || "Untitled Class",
              start,
              end,
            };
          })
          .filter(Boolean); // Remove any nulls

        setCalendarEvents(events);
      } catch (error) {
        console.error("Error fetching Google Sheet data:", error);
      }
    };

    fetchGoogleSheetData();
  }, []);

  const handleDateSelect = (info) => {
    const clicked = format(new Date(info.start || info), "dd-MM-yyyy");

    const filtered = allClasses.filter((cls) => {
      return normalizeDate(cls.date) === clicked;
    });

    setSelectedDate(clicked);
    setClassesOnDate(filtered);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Column: Calendar */}
        <div className="col-md-7 mb-4">
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
              onSelectEvent={handleDateSelect}
              popup
            />
          </div>
        </div>

        {/* Right Column: Class Details */}
        <div className="col-md-5">
          <h4 className="mb-3 text-success fw-bold">
            Classes on {selectedDate}
          </h4>
          <div className="d-flex flex-column gap-3">
            {classesOnDate.length === 0 ? (
              <div className="card shadow-sm bg-light">
                <div className="card-body text-center text-muted">
                  No classes on this date.
                </div>
              </div>
            ) : (
              classesOnDate.map((cls) => (
                <div key={cls.id} className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{cls.subject}</h5>
                    <p className="card-text mb-1">
                      <strong>Time:</strong> {cls.time}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Room:</strong> {cls.room}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Faculty:</strong> {cls.faculty}
                    </p>
                    <p className="card-text mb-0">
                      <strong>Days:</strong> {cls.days}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;