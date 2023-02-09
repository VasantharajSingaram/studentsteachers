import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';

export function AdminDashboard() {
  const [students, setStudents] = useState([]);

  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentGrade, setStudentGrade] = useState('');

  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getStudents = async () => {
    const res = await fetch('https://63c8f1ba904f040a965305cf.mockapi.io/Students');
    const data = await res.json();
    setStudents(data);
  };



  const addStudent = async (e) => {
    e.preventDefault();
    const student = { studentName, studentAge, studentGrade };
    const res = await fetch('https://63c8f1ba904f040a965305cf.mockapi.io/Students', {
      method: 'POST',
      body: JSON.stringify(student),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    setStudents([...students, data]);
    setStudentName('');
    setStudentAge('');
    setStudentGrade('');
  };



  const deleteStudent = async (index) => {
    const student = students[index];
    const res = await fetch(`https://63c8f1ba904f040a965305cf.mockapi.io/Students/${student.id}`, {
      method: 'DELETE',
    });
    getStudents();
  };



  const editStudent = async (index, e) => {
    e.preventDefault();
    const student = students[index];
    const updatedStudent = { studentName, studentAge, studentGrade };
    const res = await fetch(`https://63c8f1ba904f040a965305cf.mockapi.io/Students/${student.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedStudent),
      headers: { 'Content-Type': 'application/json' }
    });
    getStudents();
    setEdit(false);
  };




  const updateStudent = (index, e) => {
    e.preventDefault();
    setEdit(true);
    setStudentName(students[index].studentName);
    setStudentAge(students[index].studentAge);
    setStudentGrade(students[index].studentGrade);
    setIndex(index);
  };



  useEffect(() => {
    getStudents();

  }, []);


  const numStudents = students.length;

  return (
    <div className='container dashboard'>

      <h1>STUDENTS LIST</h1>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>STUDENTS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form className='forms'>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={studentName} onChange={e => setStudentName(e.target.value)} className="names" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" value={studentAge} onChange={e => setStudentAge(e.target.value)} className="names" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Grade</Form.Label>
              <Form.Control type="text" value={studentGrade} onChange={e => setStudentGrade(e.target.value)} className="names" />
            </Form.Group>
            {edit ? (
              <Button variant="primary" onClick={e => editStudent(index, e)}>
                Update
              </Button>
            ) : (
              <Button variant="primary" onClick={e => addStudent(e)}>
                Add
              </Button>
            )}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.studentName}</td>
              <td>{student.studentAge}</td>
              <td>{student.studentGrade}</td>
              <td>
                <Button className='btn-edit' variant="primary" onClick={e => { handleShow(); updateStudent(index, e); }}>
                  Edit
                </Button>
                <Button
                  className="ml-2"
                  variant="danger"
                  onClick={() => deleteStudent(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleShow}>
        ADD
      </Button>



    </div>
  );
}
