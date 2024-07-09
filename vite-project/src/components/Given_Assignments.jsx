import React, { useContext, useEffect, useState } from 'react';
import { Assignment_context } from '../STUDENT_STORE/ASSIGNMENT_CONTEXT';
import { UserContext } from '../STUDENT_STORE/USER_CONTEXT';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FlashMessage from './flash_message';
import { Link } from 'react-router-dom';

const Given_Assignments = () => {
  const { messagees , assignments_given, setAssignments_given, handleCreateAssignment ,setsubject, setsubmitted_to } = useContext(Assignment_context);
  const { loginUser } = useContext(UserContext);
  const [show, setShow] = useState(false);

  console.log(messagees)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (loginUser.STAFF_STATUS) {
      const filtered_assignments = assignments_given.filter(
        (assignment) => assignment.teacher_name.id === loginUser.ID
      );
      setAssignments_given(filtered_assignments);
    }
  }, [loginUser, assignments_given, setAssignments_given]);

  const handleSubmit = (event, assignment) => {
    event.preventDefault();

    const updatedFormData = {
      student: loginUser.ID,
      submitted_to: assignment.id,
      data: event.target.elements.file_input.files[0],
      subject: assignment.subject,
      is_draft: 'True',
    };

    const form = new FormData();
    form.append('student', updatedFormData.student);
    form.append('submitted_to', updatedFormData.submitted_to);
    form.append('data', updatedFormData.data);
    form.append('subject', updatedFormData.subject);
    form.append('is_draft', updatedFormData.is_draft);
    
   let message = handleCreateAssignment(form);
    if (message){
      alert(message)
    }
    // console.log(message)
    handleClose();
  };

  return (
    <div>
      {assignments_given.map((assignment, id) => (
        <div key={id} className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
              <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
              <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <h6 className="mb-0">{assignment.subject}</h6>
                  <p className="mb-0">{assignment.title}</p>
                </div>
                <small className="opacity-50 text-nowrap">now</small>
              </div>
            </a>
            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
              <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
              <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <h6 className="mb-0">{assignment.teacher_name.name}</h6>
                  <p className="mb-0 opacity-75">Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.</p>
                </div>
                <small className="opacity-50 text-nowrap">3d</small>
              </div>
            </a>
            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
              <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <Link to={`http://localhost:5173/assignmnets`}>
                    <button type="button" className="btn btn-outline-info" onClick={()=>{setsubject(assignment.subject)
                    console.log(assignment)
                      setsubmitted_to(assignment.id)
                      console.log("done")
                    }}>View-Submissions</button>
                  </Link>
                  {!loginUser.STAFF_STATUS && (
                    <>
                      <Button variant="outline-success" onClick={handleShow}>
                        Submit Assignment
                      </Button>
                      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>Submit Assignment</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={(event) => handleSubmit(event, assignment)}>
                          <Modal.Body>
                            <div className="mb-3">
                              <label htmlFor="formFile" className="form-label">Upload File</label>
                              <input className="form-control" type="file" id="formFile" name="file_input" />
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button variant="primary" type="submit">
                              Submit
                            </Button>
                          </Modal.Footer>
                        </form>
                      </Modal>
                    </>
                  )}

                  {messagees && alert({messagees})}

                </div>
                <small className="opacity-50 text-nowrap">1w</small>
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Given_Assignments;
