// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { format } from "date-fns";

const localizer = momentLocalizer(moment);

const Home = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "dd-MM-yyyy"));
  const [classesOnDate, setClassesOnDate] = useState([]);
  const [allClasses, setAllClasses] = useState([]);

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      // 🔐 Fetch secrets from .env file
      const SHEET_ID = import.meta.env.VITE_SHEET_ID;
      const API_KEY = import.meta.env.VITE_GOOGLE_SHEET_API_KEY;
      const SHEET_NAME = import.meta.env.VITE_SHEET_NAME; // 👈 Name of the tab/sheet

      // ✅ Google Sheets API URL — fetches the entire sheet
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values || data.values.length === 0) {
          console.warn("No data found in sheet.");
          return;
        }

        // 👇 Headers from the first row of the sheet
        const headers = data.values[0];

        // 👇 Remaining rows as data
        const rows = data.values.slice(1);

        // 🔄 Convert rows to objects using headers
        const jsonData = rows.map((row) => {
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index] || "";
          });
          return rowData;
        });

        // ✅ Store all data in state
        setAllClasses(jsonData);

        const today = format(new Date(), "dd-MM-yyyy");

        // 📆 Filter today’s classes
        const todayClasses = jsonData.filter((cls) => cls.date === today);
        setClassesOnDate(todayClasses);

        // 📅 Prepare events for calendar view
        const events = jsonData
          .filter((cls) => cls.time && cls.date)
          .map((cls) => {
            const [startTime, endTime] = cls.time.split(" - ");
            const [day, month, year] = cls.date.split("-");
            const formattedDate = `${year}-${month}-${day}`;
            const start = new Date(`${formattedDate}T${startTime}`);
            const end = new Date(`${formattedDate}T${endTime}`);

            return {
              id: cls.id,
              title: cls.subject || "Untitled Class",
              start,
              end,
            };
          });

        setCalendarEvents(events);
      } catch (error) {
        console.error("Error fetching Google Sheet data:", error);
      }
    };

    fetchGoogleSheetData();
  }, []);

  // 🔁 When a date is clicked in the calendar
  const handleDateSelect = (slotInfo) => {
    const clickedDate = format(slotInfo.start, "dd-MM-yyyy");
    setSelectedDate(clickedDate);
    const filtered = allClasses.filter((cls) => cls.date === clickedDate);
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
              popup
            />
          </div>
        </div>

        {/* Right Column: Classes for selected date */}
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
