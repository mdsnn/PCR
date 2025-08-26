import StudentList from "../components/StudentList";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Manager</h1>
      <StudentList />
    </div>
  );
}
