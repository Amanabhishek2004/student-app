import React, { useId } from 'react';
import { useContext } from 'react';
import Card from './card';
import { Student_context } from '../STUDENT_STORE/STUDENT_CONTEXT';
import { UserContext } from '../STUDENT_STORE/USER_CONTEXT';

const Cards = () => {
    const {username , loginUser} = useContext(UserContext)        
    let id = null

    const data = useContext(Student_context);

    const students = data.students;
    console.log(students)
    return (
        <div>
            {students.map((student ,index) => (
                <Card student={student} key={index}  cardId={id = useId()}/>
            ))}
        </div>
    );
};

export default Cards;
