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
  const parts = input.split(/[-/]/);
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
  const [hour, minute] = timeStr.trim().split(":");
  return new Date(year, month - 1, day, hour, minute);
};

const Home = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "dd-MM-yyyy")
  );
  const [liveClasses, setLiveClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
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
        handleDateChange(format(new Date(), "dd-MM-yyyy"), jsonData);

        // Calendar Events
        const events = jsonData
          .filter((cls) => cls.time && cls.date)
          .map((cls) => {
            const [startStr, endStr] = cls.time.split(" - ");
            const normalized = normalizeDate(cls.date);
            const [day, month, year] = normalized.split("-");

            const start = moment(
              `${year}-${month}-${day} ${startStr.trim()}`,
              "YYYY-MM-DD hh:mm A"
            ).toDate();
            const end = moment(
              `${year}-${month}-${day} ${endStr.trim()}`,
              "YYYY-MM-DD hh:mm A"
            ).toDate();

            if (
              !start ||
              !end ||
              isNaN(start.getTime()) ||
              isNaN(end.getTime())
            ) {
              return null;
            }

            return {
              id: cls.id || `${cls.subject}-${cls.date}-${cls.time}`,
              title: cls.subject || "Untitled Class",
              start,
              end,
            };
          })
          .filter(Boolean);

        setCalendarEvents(events);
      } catch (error) {
        console.error("Error fetching Google Sheet data:", error);
      }
    };

    fetchGoogleSheetData();
  }, []);

  const handleDateChange = (clickedDate, sourceData = allClasses) => {
    const filtered = sourceData.filter(
      (cls) => normalizeDate(cls.date) === clickedDate
    );

    const now = moment(); // Current system time
    const live = [];
    const upcoming = [];

    filtered.forEach((cls) => {
      if (!cls.time || !cls.date) return;

      const [startStr, endStr] = cls.time.split(" - ");
      if (!startStr || !endStr) return;

      const normalized = normalizeDate(cls.date);
      const [day, month, year] = normalized.split("-");

      const startMoment = moment(
        `${year}-${month}-${day} ${startStr.trim()}`,
        "YYYY-MM-DD hh:mm A"
      );
      const endMoment = moment(
        `${year}-${month}-${day} ${endStr.trim()}`,
        "YYYY-MM-DD hh:mm A"
      );

      if (!startMoment.isValid() || !endMoment.isValid()) return;

      if (now.isBetween(startMoment, endMoment)) {
        live.push({
          ...cls,
          start: startMoment.toDate(),
          end: endMoment.toDate(),
        });
      } else if (startMoment.isAfter(now)) {
        upcoming.push({
          ...cls,
          start: startMoment.toDate(),
          end: endMoment.toDate(),
        });
      }
    });

    upcoming.sort((a, b) => a.start - b.start);

    setSelectedDate(clickedDate);
    setLiveClasses(live);
    setUpcomingClasses(upcoming);
  };

  const handleDateSelect = (info) => {
    const clicked = format(new Date(info.start || info), "dd-MM-yyyy");
    handleDateChange(clicked);
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

          {/* Live Now */}
          <div className="mb-4">
            <h5 className="text-danger">Live Now</h5>
            {liveClasses.length === 0 ? (
              <div className="card shadow-sm bg-light">
                <div className="card-body text-center text-muted">
                  No live classes right now.
                </div>
              </div>
            ) : (
              liveClasses.map((cls, idx) => (
                <div key={idx} className="card border-danger shadow-sm">
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

          {/* Upcoming Classes */}
          <div>
            <h5 className="text-info">Upcoming Classes</h5>
            {upcomingClasses.length === 0 ? (
              <div className="card shadow-sm bg-light">
                <div className="card-body text-center text-muted">
                  No upcoming classes.
                </div>
              </div>
            ) : (
              upcomingClasses.map((cls, idx) => (
                <div key={idx} className="card shadow-sm">
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
