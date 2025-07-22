// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { format } from "date-fns";
import CalendarSection from "../components/CalendarSection";
import ClassDetailsSection from "../components/ClassDetailsSection";

const getWeekdayAbbreviation = (date) => {
  const dayIndex = new Date(date).getDay(); // 0 (Sun) to 6 (Sat)
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[dayIndex];
};

const Home = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "dd-MM-yyyy"));
  const [classesForDay, setClassesForDay] = useState([]);
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

        if (!data.values || data.values.length === 0) return;

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
        console.log(jsonData);
        handleWeekdayChange(new Date(), jsonData); // show today’s classes initially
      } catch (error) {
        console.error("Error fetching Google Sheet data:", error);
      }
    };

    fetchGoogleSheetData();
  }, []);

  const handleWeekdayChange = (clickedDate, sourceData = allClasses) => {
    const weekday = getWeekdayAbbreviation(clickedDate); // e.g., "Mon"
    const filtered = sourceData.filter((cls) => {
      const days = cls.days?.split(/[-,/ ]+/) || [];
      return days.includes(weekday);
    });

    setSelectedDate(format(clickedDate, "dd-MM-yyyy"));
    setClassesForDay(filtered);
  };

  const handleDateSelect = (info) => {
    const clickedDate = new Date(info.start || info);
    handleWeekdayChange(clickedDate);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <CalendarSection events={calendarEvents} onSelectDate={handleDateSelect} />
        <ClassDetailsSection
          selectedDate={selectedDate}
          liveClasses={[]} // not needed for day-based view
          upcomingClasses={classesForDay} // classes for that weekday
        />
      </div>
    </div>
  );
};

export default Home;
