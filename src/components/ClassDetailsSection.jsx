import { Clock, User, Book, MapPin } from "lucide-react";

const ClassInfo = ({ cls }) => (
  <div className="border rounded p-2 mb-2 bg-light shadow-sm">
    <div className="mb-1 d-flex align-items-center">
      <Book className="me-2 text-primary" size={18} />
      <strong>{cls.subject}</strong>
    </div>
    <div className="mb-1 d-flex align-items-center">
      <User className="me-2 text-secondary" size={18} />
      <span>{cls.faculty}</span>
    </div>
    <div className="mb-1 d-flex align-items-center">
      <Clock className="me-2 text-success" size={18} />
      <span>{cls.time}</span>
    </div>
    <div className="d-flex align-items-center">
      <MapPin className="me-2 text-warning" size={18} />
      <span>{cls.room}</span>
    </div>
  </div>
);

const CourseSection = ({ title, classes, type }) => (
  <div className="col-md-4 mb-4">
    <div className="bg-white p-3 rounded shadow-sm h-100">
      <h6 className="fw-bold text-primary text-center mb-3">{title}</h6>
      {classes.length > 0 ? (
        classes.map((cls, idx) => <ClassInfo key={idx} cls={cls} />)
      ) : (
        <p className="text-muted text-center">No {type.toLowerCase()} classes</p>
      )}
    </div>
  </div>
);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const ClassDetailsSection = ({ selectedDate, liveClasses, upcomingClasses }) => {
  const courses = ["BCA", "BIT", "MCA"];

  return (
    <div className="row">
      <h5 className="fw-bold text-primary mb-3">
        Classes on {formatDate(selectedDate)}
      </h5>

      <div className="d-flex align-items-center mb-2">
        <img
          src="./live-now.gif"
          alt="Live"
          style={{ height: "60px", marginRight: "20px" }}
        />
      </div>
      <div className="row mb-4">
        {courses.map((course) => (
          <CourseSection
            key={course}
            title={course}
            type="Live"
            classes={liveClasses[course] || []}
          />
        ))}
      </div>

      <div className="d-flex align-items-center mb-2">
        <img
          src="./upcoming.gif"
          alt="Upcoming Classes"
          style={{ height: "60px", marginRight: "20px" }}
        />
      </div>
      <div className="row">
        {courses.map((course) => (
          <CourseSection
            key={course}
            title={course}
            type="Upcoming"
            classes={upcomingClasses[course] || []}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassDetailsSection;
