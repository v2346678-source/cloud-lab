import { useState, useEffect } from "react";

// Khai báo Base URL Backend port 5000
const API_URL = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // CÂU 47: Gọi API GET /api/students để lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Loi khi lay danh sach:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // CÂU 49: Xử lý Submit Form -> Gọi API POST /api/students
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !name || !email)
      return alert("Vui long dien du thong tin!");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, name, email }),
      });

      if (res.ok) {
        setStudentId("");
        setName("");
        setEmail("");
        fetchStudents(); // Re-fetch danh sách mới
      }
    } catch (err) {
      console.error("Loi khi them sinh vien:", err);
    }
  };

  // CÂU 77: Cập nhật thông tin sinh viên (PUT /api/students/:id)
  const handleUpdate = async (id) => {
    const newName = prompt("Nhap ho ten moi:");
    if (!newName) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (res.ok) {
        fetchStudents();
      }
    } catch (err) {
      console.error("Loi khi cap nhat:", err);
    }
  };

  // CÂU 78: Xóa sinh viên (DELETE /api/students/:id)
  const handleDelete = async (id) => {
    if (!window.confirm("Ban co chac chan muon xoa sinh vien nay?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchStudents();
      }
    } catch (err) {
      console.error("Loi khi xoa sinh vien:", err);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1>Quan Ly Sinh Vien (MERN Stack)</h1>

      {/* CÂU 48: Form nhập thông tin MSSV, Họ tên, Email */}
      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "30px", display: "flex", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Ma sinh vien (MSSV)"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Ho va ten"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Them Sinh Vien
        </button>
      </form>

      {/* CÂU 47, 77, 78: Hiển thị danh sách & các nút thao tác */}
      <h2>Danh Sach Sinh Vien</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id} style={{ marginBottom: "8px" }}>
            <strong>{student.studentId}</strong> - {student.name} (
            {student.email}){/* Nút Sửa (CÂU 77) */}
            <button
              onClick={() => handleUpdate(student._id)}
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              Sua
            </button>
            {/* Nút Xóa (CÂU 78) */}
            <button
              onClick={() => handleDelete(student._id)}
              style={{ marginLeft: "5px", cursor: "pointer", color: "red" }}
            >
              Xoa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
