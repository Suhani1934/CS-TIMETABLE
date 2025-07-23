import { Clock, User, Book, MapPin, CalendarDays } from "lucide-react";

const ClassInfo = ({ cls }) => (
  <div className="card mb-3 shadow-sm border-0">
    <div className="card-body p-3">
      <h6 className="card-title text-primary fw-semibold d-flex align-items-center mb-2">
        <Book size={16} className="me-2" />
        {cls.subject}
      </h6>
      <p className="card-text mb-2 d-flex align-items-center">
        <User size={16} className="me-2 text-muted" />
        <span>{cls.faculty}</span>
      </p>
      <p className="card-text mb-2 d-flex align-items-center">
        <Clock size={16} className="me-2 text-success" />
        <span>{cls.time}</span>
      </p>
      <p className="card-text mb-2 d-flex align-items-center">
        <MapPin size={16} className="me-2 text-warning" />
        <span>{cls.room}</span>
      </p>
      <p className="card-text d-flex align-items-center">
        <CalendarDays size={16} className="me-2 text-dark" />
        <span>{cls.days}</span>
      </p>
    </div>
  </div>
);

const CourseSection = ({ title, classes, type }) => (
  <div className="col-lg-4 mb-4">
    <div className="bg-white rounded-4 shadow-sm p-3 h-100 border border-light-subtle">
      <h5
        className={`fw-bold text-center mb-3 ${
          type === "Live" ? "text-danger" : "text-success"
        }`}
      >
        {title}
      </h5>
      {classes.length > 0 ? (
        classes.map((cls, idx) => <ClassInfo key={idx} cls={cls} />)
      ) : (
        <div className="text-center text-muted">No {type.toLowerCase()} classes</div>
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
      <div className="col-12 mb-3">
        <h4 className="fw-bold text-primary">Classes on {formatDate(selectedDate)}</h4>
      </div>

      <div className="d-flex align-items-center mb-3">
        <img
          src="/live-now.gif"
          alt="Live"
          style={{ height: "70px", marginRight: "10px" }}
        />
      </div>
      <div className="row mb-5">
        {courses.map((course) => (
          <CourseSection
            key={course}
            title={course}
            type="Live"
            classes={liveClasses[course] || []}
          />
        ))}
      </div>

      <div className="d-flex align-items-center mb-3">
        <img
          src="/upcoming.gif"
          alt="Upcoming Classes"
          style={{ height: "70px", marginRight: "10px" }}
        />
      <h3 className="fw-bold text-success mb-3">Upcoming Classes</h3>
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
