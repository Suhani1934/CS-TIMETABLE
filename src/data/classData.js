const dummyClasses = [
  {
    id: 1,
    subject: "Data Structures",
    time: "10:00 AM - 11:00 AM",
    room: "Room 101",
    faculty: "Dr. A. Sharma",
    date: new Date().toISOString().split("T")[0], // Today
    days: "Monday - Friday"
  },
  {
    id: 2,
    subject: "Operating Systems",
    time: "1:00 PM - 2:00 PM",
    room: "Room 202",
    faculty: "Prof. R. Kumar",
    date: new Date().toISOString().split("T")[0],
    days: "Tuesday - Thursday"
  },
  {
    id: 3,
    subject: "Networks",
    time: "3:00 PM - 4:00 PM",
    room: "Room 303",
    faculty: "Dr. V. Singh",
    date: "2025-07-17",
    days: "Monday - Saturday"
  },
  {
    id: 4,
    subject: "Artificial Intelligence",
    time: "9:00 AM - 10:00 AM",
    room: "Lab 1",
    faculty: "Dr. Meera Kapoor",
    date: "2025-07-19",
    days: "Wednesday - Friday"
  },
   {
    id: 5,
    subject: "Machine Learning",
    time: "11:00 AM - 12:00 PM",
    room: "Lab 2",
    faculty: "Dr. Tanmay Joshi",
    date: "2025-07-19",
    days: "Monday - Thursday"
  },
  {
    id: 6,
    subject: "Web Development",
    time: "2:00 PM - 3:00 PM",
    room: "Room 104",
    faculty: "Ms. Priya Verma",
    date: "2025-07-20",
    days: "Monday - Friday"
  },
  {
    id: 7,
    subject: "Cloud Computing",
    time: "3:00 PM - 4:00 PM",
    room: "Room 105",
    faculty: "Mr. Kunal Bhatia",
    date: "2025-07-20",
    days: "Tuesday - Thursday"
  },
  {
    id: 8,
    subject: "Cybersecurity",
    time: "1:00 PM - 2:00 PM",
    room: "Room 106",
    faculty: "Ms. Anjali Rao",
    date: "2025-07-21",
    days: "Wednesday - Saturday"
  },
  {
    id: 9,
    subject: "Database Systems",
    time: "12:00 PM - 1:00 PM",
    room: "Room 107",
    faculty: "Prof. Sameer Dutta",
    date: "2025-07-21",
    days: "Monday - Friday"
  },
  {
    id: 10,
    subject: "Software Engineering",
    time: "10:00 AM - 11:00 AM",
    room: "Room 108",
    faculty: "Dr. Kavita Menon",
    date: "2025-07-22",
    days: "Tuesday - Friday"
  }
];

export default dummyClasses;