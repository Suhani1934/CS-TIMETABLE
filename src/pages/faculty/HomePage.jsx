import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card, ListGroup } from "react-bootstrap";

const dummyClasses = [
  {
    id: 1,
    subject: "Data Structures",
    time: "10:00 AM - 11:00 AM",
    room: "Room 101",
    faculty: "Dr. A. Sharma",
    date: new Date().toDateString(), // Today
  },
  {
    id: 2,
    subject: "Operating Systems",
    time: "1:00 PM - 2:00 PM",
    room: "Room 202",
    faculty: "Prof. R. Kumar",
    date: new Date().toDateString(), // Today
  },
  {
    id: 3,
    subject: "Networks",
    time: "3:00 PM - 4:00 PM",
    room: "Room 303",
    faculty: "Dr. V. Singh",
    date: "Mon Jul 10 2025", // Another date
  },
];

const FacultyHomePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classesForDate, setClassesForDate] = useState([]);

  useEffect(() => {
    const filtered = dummyClasses.filter(
      (cls) => cls.date === selectedDate.toDateString()
    );
    setClassesForDate(filtered);
  }, [selectedDate]);

  return (
      <div className="d-flex flex-column flex-md-row gap-4">
        {/* Calendar Section */}
        <div className="col-md-7">
          <Card>
            <Card.Header className="bg-primary text-white">
              Select Date
            </Card.Header>
            <Card.Body>
              <Calendar onChange={setSelectedDate} value={selectedDate} />
            </Card.Body>
          </Card>
        </div>

        {/* Today's Classes Section */}
        <div className="col-md-5">
          <Card>
            <Card.Header className="bg-success text-white">
              Classes on {selectedDate.toDateString()}
            </Card.Header>
            <ListGroup variant="flush">
              {classesForDate.length > 0 ? (
                classesForDate.map((cls) => (
                  <ListGroup.Item key={cls.id}>
                    <strong>{cls.subject}</strong> <br />
                    <small>
                      {cls.time} | {cls.room}
                    </small>
                    <br />
                    <span className="text-muted">By {cls.faculty}</span>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No classes scheduled</ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </div>
      </div>
  );
};

export default FacultyHomePage;
