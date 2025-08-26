import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </Router>
  );
}
