import { useEffect, useState } from "react";
import axios from "axios";
import "./TimetableSection.css";

const TimetableSection = () => {
  const [timetable, setTimetable] = useState([]);
  const SHEET_ID = import.meta.env.VITE_SHEET_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_SHEET_API_KEY;
  const FREE_SLOT_BCA = import.meta.env.VITE_FREE_SLOT_BCA_I;

  useEffect(() => {
    axios
      .get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${FREE_SLOT_BCA}?key=${API_KEY}`
      )
      .then((res) => {
        const values = res.data.values;
        if (values && values.length > 1) {
          const headers = values[0];
          const rows = values.slice(1).map((row) => {
            const rowObj = {};
            headers.forEach((header, index) => {
              rowObj[header] = row[index] || "";
            });
            return rowObj;
          });
          setTimetable(rows);
        }
      })
      .catch((err) => console.error("Error loading timetable", err));
  }, []);

  return (
    <div className="table-responsive mt-4">
      <h4 className="text-center text-primary">Free Slot BCA/BIT 1st year</h4>
      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>Days</th>
            {timetable.length > 0 &&
              Object.keys(timetable[0])
                .filter((key) => key !== "Days")
                .map((time, index) => <th key={index}>{time}</th>)}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(timetable) &&
            timetable.map((row, i) => (
              <tr key={i}>
                <td className="fw-bold">{row["Days"]}</td>
                {Object.keys(row)
                  .filter((key) => key !== "Days")
                  .map((key, j) => {
                    const cell = row[key];
                    let cellClass = "";

                    if (cell.toLowerCase().includes("lunch")) {
                      cellClass = "lunch-time";
                    } else if (cell.toLowerCase().includes("prayer")) {
                      cellClass = "prayer-time";
                    } else if (cell.toLowerCase().includes("free")) {
                      cellClass = "free-slot";
                    }

                    return (
                      <td
                        key={j}
                        className={cellClass}
                        style={{
                          backgroundColor:
                            cellClass === "free-slot" ? "yellow" : undefined,
                        }}
                      >
                        {cell}
                      </td>
                    );
                  })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableSection;
