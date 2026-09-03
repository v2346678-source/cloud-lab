import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // CÂU 47: Gọi API GET /api/students để lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Loi khi lay danh sach:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // CÂU 49: Xử lý Submit Form -> Gọi API POST /api/students
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !name || !email) return alert('Vui long dien du thong tin!');

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, name, email })
      });

      if (res.ok) {
        setStudentId('');
        setName('');
        setEmail('');
        fetchStudents(); // Re-fetch danh sách mới
      }
    } catch (err) {
      console.error('Loi khi them sinh vien:', err);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Quan Ly Sinh Vien (MERN Stack)</h1>

      {/* CÂU 48: Form nhập thông tin MSSV, Họ tên, Email */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Ma sinh vien (MSSV)"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Ho va ten"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Them Sinh Vien</button>
      </form>

      {/* CÂU 47: Hiển thị danh sách sinh viên ra giao diện */}
      <h2>Danh Sach Sinh Vien</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id} style={{ marginBottom: '8px' }}>
            <strong>{student.studentId}</strong> - {student.name} ({student.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;