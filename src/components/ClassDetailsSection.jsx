import { ListGroup, Badge } from "react-bootstrap";
import { Clock, GeoAlt, Person, CalendarEvent } from "react-bootstrap-icons";

const ClassDetailsSection = ({
  selectedDate,
  liveClasses,
  upcomingClasses,
}) => {
  return (
    <div className="col-md-5">
      <h4 className="mb-3 text-success fw-bold">Classes on {selectedDate}</h4>

      {/* Live Now Section */}
      <div className="mb-4">
        <div className="d-flex align-items-center mb-3">
          <img
            src="/live-now.gif"
            alt="Live Now"
            style={{ height: "3.5rem" }}
            className="me-2"
          />
        </div>
        {liveClasses.length === 0 ? (
          <div className="card shadow-sm bg-light">
            <div className="card-body text-center text-muted">
              No live classes right now.
            </div>
          </div>
        ) : (
          <div className="row g-3">
            {liveClasses.map((cls, idx) => (
              <div key={idx} className="col-12">
                <div className="card shadow-sm border-start border-5 border-danger bg-yellow">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title text-primary fw-bold mb-0">
                        {cls.subject}
                      </h5>
                      <span className="badge bg-danger">Live</span>
                    </div>
                    <ClassInfo cls={cls} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Classes */}
      <div className="mb-4">
        <div className="d-flex align-items-center mb-3">
          <img
            src="/upcoming.gif"
            alt="Upcoming"
            style={{ height: "3.5rem" }}
            className="me-2"
          />
          <h4
            className="fw-bold text-success m-0"
            style={{ fontSize: "1.5rem" }}
          >
            Upcoming Classes
          </h4>
        </div>
        {upcomingClasses.length === 0 ? (
          <div className="card shadow-sm bg-light">
            <div className="card-body text-center text-muted">
              No upcoming classes.
            </div>
          </div>
        ) : (
          <div className="row g-3">
            {upcomingClasses.map((cls, idx) => (
              <div key={idx} className="col-12">
                <div className="card shadow-sm border-start border-5">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title text-success fw-bold mb-0">
                        {cls.subject}
                      </h5>
                      
                    </div>
                    <ClassInfo cls={cls} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ClassInfo = ({ cls }) => (
  <ListGroup variant="flush" className="small">
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <span>
        <Clock className="me-2 text-primary" /> <strong>Time:</strong>
      </span>
      <Badge bg="light" text="dark">
        {cls.time || "N/A"}
      </Badge>
    </ListGroup.Item>

    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <span>
        <GeoAlt className="me-2 text-danger" /> <strong>Room:</strong>
      </span>
      <Badge bg="light" text="dark">
        {cls.room || "N/A"}
      </Badge>
    </ListGroup.Item>

    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <span>
        <Person className="me-2 text-success" /> <strong>Faculty:</strong>
      </span>
      <Badge bg="light" text="dark">
        {cls.faculty || "N/A"}
      </Badge>
    </ListGroup.Item>

    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <span>
        <CalendarEvent className="me-2 text-info" /> <strong>Days:</strong>
      </span>
      <Badge bg="light" text="dark">
        {cls.days || "N/A"}
      </Badge>
    </ListGroup.Item>
  </ListGroup>
);

export default ClassDetailsSection;
