import StudentForm from "../components/StudentForm";

export default function EditStudent() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Student</h1>
      <StudentForm isEdit={true} />
    </div>
  );
}
