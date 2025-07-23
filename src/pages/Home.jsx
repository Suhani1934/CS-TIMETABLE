import { useState, useEffect } from "react";
import moment from "moment";
import CalendarSection from "../components/CalendarSection";
import ClassDetailsSection from "../components/ClassDetailsSection";

const getWeekdayAbbreviation = (date) => {
  const dayIndex = new Date(date).getDay();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[dayIndex];
};

const isClassLive = (classTime, date) => {
  const [startStr, endStr] = classTime.split(" - ");
  const selectedDateStr = moment(date).format("YYYY-MM-DD");

  const start = moment(`${selectedDateStr} ${startStr}`, "YYYY-MM-DD hh:mm A");
  const end = moment(`${selectedDateStr} ${endStr}`, "YYYY-MM-DD hh:mm A");

  const now = moment();
  return now.isBetween(start, end);
};

const getExpandedDays = (daysStr) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const parts = daysStr.split(/[,/]+/).map((s) => s.trim());
  let result = [];

  parts.forEach((part) => {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map((s) => s.trim());
      const startIndex = weekdays.indexOf(start);
      const endIndex = weekdays.indexOf(end);

      if (startIndex !== -1 && endIndex !== -1) {
        if (startIndex <= endIndex) {
          result.push(...weekdays.slice(startIndex, endIndex + 1));
        } else {
          // for ranges like "Fri-Mon"
          result.push(...weekdays.slice(startIndex), ...weekdays.slice(0, endIndex + 1));
        }
      }
    } else {
      if (weekdays.includes(part)) {
        result.push(part);
      }
    }
  });

  return result;
};

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allClasses, setAllClasses] = useState([]);
  const [liveClasses, setLiveClasses] = useState({});
  const [upcomingClasses, setUpcomingClasses] = useState({});

  const courses = ["BCA", "BIT", "MCA"];

  useEffect(() => {
    const fetchData = async () => {
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
          const entry = {};
          headers.forEach((header, index) => {
            entry[header.toLowerCase()] = row[index] || "";
          });
          return entry;
        });

        setAllClasses(jsonData);
        filterClasses(jsonData, selectedDate);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };

    fetchData();
  }, []);

  const filterClasses = (data, date) => {
    const weekday = getWeekdayAbbreviation(date);
    const live = {};
    const upcoming = {};

    const selectedDateStr = moment(date).format("YYYY-MM-DD");
    const now = moment();

    courses.forEach((course) => {
      const courseClasses = data.filter((cls) => {
        const expandedDays = getExpandedDays(cls.days);
        return (
          cls.course.toLowerCase().includes(course.toLowerCase()) &&
          expandedDays.includes(weekday)
        );
      });

      live[course] = courseClasses.filter((cls) => isClassLive(cls.time, date));

      upcoming[course] = courseClasses.filter((cls) => {
        if (isClassLive(cls.time, date)) return false;

        const [startStr] = cls.time.split(" - ");
        const start = moment(`${selectedDateStr} ${startStr}`, "YYYY-MM-DD hh:mm A");

        return start.isAfter(now);
      });
    });

    setLiveClasses(live);
    setUpcomingClasses(upcoming);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    filterClasses(allClasses, date);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div >
          <CalendarSection
            selectedDate={selectedDate}
            onDateChange={handleDateSelect}
          />
        </div>
        <div >
          <ClassDetailsSection
            selectedDate={selectedDate}
            liveClasses={liveClasses}
            upcomingClasses={upcomingClasses}
          />
        </div>
      </div>
    </div>

    // <Container>
    //   {/* Stack the columns on mobile by making one full-width and the other half-width */}
    //   <Row>
    //     <Col xs={12} md={8}>
    //       xs=12 md=8
    //     </Col>
    //     <Col xs={6} md={4}>
    //       xs=6 md=4
    //     </Col>
    //   </Row>
  );
};

export default Home;
