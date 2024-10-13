import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Assignment_context } from '../STUDENT_STORE/ASSIGNMENT_CONTEXT';
import { UserContext } from '../STUDENT_STORE/USER_CONTEXT';

const Due_assignment = () => {
  const { loginUser } = useContext(UserContext);
  const { due_assingments } = useContext(Assignment_context);

  function calculateTimeDifference(deadline) {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();

    const timeDifference = deadlineDate - currentDate;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div>
      {/* Check if due_assingments and due_assingments.data exist */}
      {due_assingments && due_assingments.data && due_assingments.data.length > 0 ? (
        loginUser.STAFF_STATUS ? (
          due_assingments.data.map((index) => (
            <Card className="bg-dark text-center" style={{
              marginLeft: "10rem",
              marginRight: "10rem",
              marginTop: "2rem"
            }} key={index.assignment.id}>
              <Card.Header style={{ color: "red" }}></Card.Header>
              <Card.Body>
                <Card.Title style={{ color: "white", textAlign: "center" }}>
                  Subject - {index.assignment.title}
                </Card.Title>
                <Card.Text style={{ color: "white" }}>
                  Student -- {index.Student}
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ color: "white" }}>
                {`${-calculateTimeDifference(index.assignment.Deadline).days}d ago`}
              </Card.Footer>
            </Card>
          ))
        ) : (
          due_assingments.data.map((index) => (
            <Card className="bg-dark text-center" style={{
              marginLeft: "10rem",
              marginRight: "10rem",
              marginTop: "2rem"
            }} key={index.id}>
              <Card.Header style={{ color: "red" }}></Card.Header>
              <Card.Body>
                <Card.Title style={{ color: "white", textAlign: "center" }}>
                  Subject - {index.title}
                </Card.Title>
                <Card.Text style={{ color: "white" }}>
                  Designation -- {index.teacher_data.designation}
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ color: "white" }}>
                {`${-calculateTimeDifference(index.Deadline).days}d ${-calculateTimeDifference(index.Deadline).hours}h ${-calculateTimeDifference(index.Deadline).minutes}m ago`}
              </Card.Footer>
            </Card>
          ))
        )
      ) : (
        <p>No due assignments available.</p> // Display message if there are no assignments
      )}
    </div>
  );
};

export default Due_assignment;
