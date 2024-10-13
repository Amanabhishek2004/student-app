import React, { useId } from 'react';
import { useContext } from 'react';
import Card_ from './card';
import { Student_context } from '../STUDENT_STORE/STUDENT_CONTEXT';
import { UserContext } from '../STUDENT_STORE/USER_CONTEXT';

const Cards = () => {
    const { username, loginUser } = useContext(UserContext);
    const data = useContext(Student_context);
    const students = data.students;
    
    // Generate a unique ID for each student outside the map
    const uniqueIds = students ? students.map(() => useId()) : [];

    return (
        <div>
            {students && students.length > 0 ? (
                students.map((student, index) => (
                    <Card_ student={student} key={index} cardId={uniqueIds[index]} />
                ))
            ) : (
                ""
            )}
        </div>
    );
};

export default Cards