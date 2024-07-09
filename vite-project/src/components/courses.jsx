import React, { useContext, useEffect ,useId } from 'react'
import { Student_context } from '../STUDENT_STORE/STUDENT_CONTEXT';
import { useLocation } from 'react-router-dom';
// import { UserContext } from '../STUDENT_STORE/USER_CONTEXT';
import Course from './course';

const Courses = () => {
  let { students } = useContext(Student_context);
  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);
  const id = queryparams.get("id")
  let filtered_students = students.filter((student)=>{return student.id ===Number(id)})
  console.log(filtered_students)
  students = filtered_students
  console.log(students)
  return (
    <>
      {students.map((student, index) => (
        <Course Attendance={student.Attendance_in_each_subject}  cardId={index} />
      ))}
    </>
  );
};

export default Courses;