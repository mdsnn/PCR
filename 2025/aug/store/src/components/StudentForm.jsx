import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function StudentForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      api.get(`/students/${id}`).then((res) => {
        setForm(res.data.data);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/students/${id}`, form);
      } else {
        await api.post("/students", form);
      }
      navigate("/");
    } catch (err) {
      console.error("Error saving student", err);
      alert("Error: " + (err.response?.data?.error || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Age</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : isEdit ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}
