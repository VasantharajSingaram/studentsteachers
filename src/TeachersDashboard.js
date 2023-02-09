import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';

export function TeachersDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [teacherName, setTeacherName] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('');

  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getTeachers = async () => {
    const res = await fetch('https://63e3cd41619fce55d421d625.mockapi.io/Teachers');
    const data = await res.json();
    setTeachers(data);
  };


  const addTeacher = async (e) => {
    e.preventDefault();
    const teacher = { teacherName, teacherSubject };
    const res = await fetch('https://63e3cd41619fce55d421d625.mockapi.io/Teachers', {
      method: 'POST',
      body: JSON.stringify(teacher),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    setTeachers([...teachers, data]);
    setTeacherName('');
    setTeacherSubject('');
  };


  const deleteTeacher = async (index) => {
    const teacher = teachers[index];
    const res = await fetch(`https://63e3cd41619fce55d421d625.mockapi.io/Teachers/${teacher.id}`, {
      method: 'DELETE',
    });
    getTeachers();
  };


  const editTeacher = async (index, e) => {
    e.preventDefault();
    const teacher = teachers[index];
    const updatedTeacher = { teacherName, teacherSubject };
    const res = await fetch(`https://63e3cd41619fce55d421d625.mockapi.io/Teachers/${teacher.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTeacher),
      headers: { 'Content-Type': 'application/json' }
    });
    getTeachers();
    setEdit(false);
  };


  const updateTeacher = (index, e) => {
    e.preventDefault();
    setEdit(true);
    setTeacherName(teachers[index].teacherName);
    setTeacherSubject(teachers[index].teacherSubject);
    setIndex(index);
  };

  useEffect(() => {
    getTeachers();

  }, []);
  return (
    <div className='container dashboard'>


      <h1>TEACHERS LIST</h1>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>TEACHERS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={teacherName} onChange={e => setTeacherName(e.target.value)} className="names" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" value={teacherSubject} onChange={e => setTeacherSubject(e.target.value)} className="names" />
            </Form.Group>
            {edit ? (
              <Button variant="primary" onClick={e => editTeacher(index, e)}>
                Update
              </Button>
            ) : (
              <Button variant="primary" onClick={e => addTeacher(e)}>
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
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={index}>
              <td>{teacher.teacherName}</td>
              <td>{teacher.teacherSubject}</td>
              <td>
                <Button className='btn-edit' variant="primary" onClick={e => { handleShow(); updateTeacher(index, e); }}>
                  Edit
                </Button>
                <Button
                  className="ml-2"
                  variant="danger"
                  onClick={() => deleteTeacher(index)}
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
