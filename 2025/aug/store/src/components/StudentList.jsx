import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Students</h2>
      <Link to="/add" className="bg-blue-500 text-white px-3 py-1 rounded">
        + Add Student
      </Link>
      <ul className="mt-4">
        {students.map((student) => (
          <li key={student.id} className="flex justify-between border p-2 mb-2">
            <div>
              <p>
                <strong>{student.name}</strong> ({student.age})
              </p>
              <p>{student.email}</p>
            </div>
            <div className="space-x-2">
              <Link
                to={`/edit/${student.id}`}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteStudent(student.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
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
