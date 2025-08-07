import {
  Clock,
  User,
  Book,
  MapPin,
  CalendarDays,
  School,
} from "lucide-react";
import "./ClassDetailsSection.css";

// Color Mapping (course + semester)
const semesterColors = {
  "BIT I sem": "#c3ebf8e3",    
  "BIT III sem": "#87CEFA",
  "BIT V sem": "#8bc0f1da",    

  "BCA I sem": "#aaf1aad8",     
  "BCA III sem": "#b4f5b4dc",  
  "BCA V sem": "#9deb95ff",    

  "MCA I sem": "#FFFACD",     
  "MCA III sem": "#f5f5b2ff",   
};

// Class card component
const ClassInfo = ({ cls, type }) => {
  const key = `${cls.course} ${cls.semester}`;
  const bgColor = semesterColors[key] || (type === "Live" ? "#ffe6e6" : "#e6f2ff");

  return (
    <div
      className="card mb-3 shadow-sm border-0"
      style={{ backgroundColor: bgColor }}
    >
      <div className="card-body p-3">
        <h6 className="card-title fw-semibold d-flex align-items-center mb-2">
          <Book size={16} className="me-2 text-dark" />
          {cls.subject}
        </h6>
        <p className="card-text mb-2 d-flex align-items-center">
          <User size={16} className="me-2 text-dark" />
          <span>{cls.faculty}</span>
        </p>
        <p className="card-text mb-2 d-flex align-items-center">
          <Clock size={16} className="me-2 text-dark" />
          <span>{cls.time}</span>
        </p>
        <p className="card-text mb-2 d-flex align-items-center">
          <MapPin size={16} className="me-2 text-dark" />
          <span>{cls.room}</span>
        </p>
        <p className="card-text mb-2 d-flex align-items-center">
          <CalendarDays size={16} className="me-2 text-dark" />
          <span>{cls.days}</span>
        </p>
        <p className="card-text d-flex align-items-center">
          <School size={16} className="me-2 text-dark" />
          <span>{cls.semester}</span>
        </p>
      </div>
    </div>
  );
};

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
        classes.map((cls, idx) => <ClassInfo key={idx} cls={cls} type={type} />)
      ) : (
        <div className="text-center text-muted">
          No {type.toLowerCase()} classes
        </div>
      )}
    </div>
  </div>
);

const ClassDetailsSection = ({ liveClasses, upcomingClasses, searchTerm }) => {
  const courses = ["BCA", "BIT", "MCA"];

  // Function to filter by search term
  const matchesSearch = (cls) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      cls.subject?.toLowerCase().includes(term) ||
      cls.faculty?.toLowerCase().includes(term) ||
      cls.room?.toLowerCase().includes(term) ||
      cls.days?.toLowerCase().includes(term) ||
      cls.semester?.toLowerCase().includes(term)
    );
  };

  return (
    <div className="row">
      {/* Live Classes Section */}
      <div className="d-flex align-items-center mb-3">
        <img
          src="/live-now.gif"
          alt="Live"
          style={{ height: "70px", marginRight: "10px" }}
        />
        <h3 className="fw-bold text-danger mb-0">Live Classes</h3>
      </div>

      <div className="row mb-5">
        {courses.map((course) => (
          <CourseSection
            key={course}
            title={course}
            type="Live"
            classes={(liveClasses[course] || []).filter((cls) =>
              matchesSearch(cls)
            )}
          />
        ))}
      </div>

      {/* Upcoming Classes Section */}
      <div className="d-flex align-items-center mb-3">
        <img
          src="/next.gif"
          alt="Upcoming Classes"
          style={{ height: "90px", marginRight: "10px" }}
        />
        <h3 className="fw-bold text-success mb-0">Upcoming Classes</h3>
      </div>

      <div className="row">
        {courses.map((course) => (
          <CourseSection
            key={course}
            title={course}
            type="Upcoming"
            classes={(upcomingClasses[course] || []).filter((cls) =>
              matchesSearch(cls)
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassDetailsSection;
