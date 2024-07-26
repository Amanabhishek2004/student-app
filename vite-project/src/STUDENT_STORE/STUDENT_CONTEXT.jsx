import { createContext, useState ,useEffect, useContext } from "react";
import React from 'react';
import { UserContext } from "./USER_CONTEXT";


const Student_context = createContext({
    message:"",
    students: [],
    add_student: () => {},
    delete_student: () => {},    
    class_attended : null,
    setclass_attended:()=>{},
    MarkAttendance:()=>{}
});

const STUDENT_CONTEXT_PROVIDER = ({ children }) => {
    const [class_attended , setclass_attended] = useState(true)
    const [Students, setStudents] = useState([]);
    const  {loginUser} = useContext(UserContext)
    useEffect(() => {
        // console.log(`http://localhost:8000/api/students/?user_id=${loginUser.ID}`)
        if (loginUser){
            fetch(`http://localhost:8000/api/students/?user_id=${loginUser.USERNAME}`) 
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setStudents(data)
            })
            .catch(error => console.error('Error:', error));
        }
    }, [class_attended , loginUser])

    

    const MarkAttendance = (id , val ,data) =>{
        
        const  url = `http://127.0.0.1:8000/api/Mark-Attendance/${id}/?sub=${data.subject_name}&stu=AMAN&data=${val}&user_id=${loginUser.ID}`
         fetch(url , {
             method :"PATCH",

         }).then(response => response.json()).then(data => console.log(data))}

    const [message , setmessage]  = useState("You can view all the students here")
    const add_student = (newStudent) => {
        setStudents((prevStudents) => [...prevStudents, newStudent]);
    };
    
    const delete_student = (studentId) => {
        setStudents((prevStudents) => prevStudents.filter(student => student.id !== studentId));
    };

    return (
        <Student_context.Provider value={{ students: Students, add_student, delete_student , message , setmessage , setclass_attended ,class_attended , MarkAttendance }}>
            {children}
        </Student_context.Provider>
    );
};

export { Student_context, STUDENT_CONTEXT_PROVIDER };


