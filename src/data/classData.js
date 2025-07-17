const dummyClasses = [
  {
    id: 1,
    subject: "Data Structures",
    time: "10:00 AM - 11:00 AM",
    room: "Room 101",
    faculty: "Dr. A. Sharma",
    date: new Date().toISOString().split("T")[0], // Today
  },
  {
    id: 2,
    subject: "Operating Systems",
    time: "1:00 PM - 2:00 PM",
    room: "Room 202",
    faculty: "Prof. R. Kumar",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 3,
    subject: "Networks",
    time: "3:00 PM - 4:00 PM",
    room: "Room 303",
    faculty: "Dr. V. Singh",
    date: "2025-07-18",
  },
  {
    id: 4,
    subject: "Artificial Intelligence",
    time: "9:00 AM - 10:00 AM",
    room: "Lab 1",
    faculty: "Dr. Meera Kapoor",
    date: "2025-07-18",
  },
];

export default dummyClasses;
