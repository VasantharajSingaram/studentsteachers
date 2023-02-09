import React, { useState, useEffect } from "react";
import './App.css';


export function TheHome() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);


  const getStudents = async () => {
    const res = await fetch('https://63c8f1ba904f040a965305cf.mockapi.io/Students');
    const data = await res.json();
    setStudents(data);
  };

  const getTeachers = async () => {
    const res = await fetch('https://63e3cd41619fce55d421d625.mockapi.io/Teachers');
    const data = await res.json();
    setTeachers(data);
  };

  useEffect(() => {
    getStudents();

  }, []);

  useEffect(() => {
    getTeachers();

  }, []);

  const numStudents = students.length;
  const numTeachers = teachers.length;

  return (
    <div>
    <div className='container dash'>

      <div className='contain-box'>
        <div><h1>Number of Students</h1></div>
        <div><h1>{numStudents}</h1></div>
      
      </div>
      
      <div className='contain-box-2'>
        <div><h1>Number of Teachers</h1></div>
        <div><h1>{numTeachers}</h1></div>

      </div>


    </div>
    
    </div>
  );

}


const DateTime = () => {
  const [date, setDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
     
      <h2>{date}</h2>
    </div>
  );
};