import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./StudentList.css"; // Import the CSS file

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data.data);
    } catch (err) {
      console.error("Error fetching students", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting student", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="student-list-container">
      <h2 className="student-list-title">Students</h2>
      <Link to="/add" className="add-student-btn">
        + Add Student
      </Link>
      <ul className="students-list">
        {students.map((student) => (
          <li key={student.id} className="student-item">
            <div className="student-info">
              <p className="student-name-age">
                <strong>{student.name}</strong> ({student.age})
              </p>
              <p className="student-email">{student.email}</p>
            </div>
            <div className="student-actions">
              <Link to={`/edit/${student.id}`} className="edit-btn">
                Edit
              </Link>
              <button
                onClick={() => deleteStudent(student.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
