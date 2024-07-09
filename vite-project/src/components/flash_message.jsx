import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FlashMessage = ({ message, handleSubmit, assignment }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);


  return (
    <>
      {message && (
        <div>
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Submit Assignment</Modal.Title>
            </Modal.Header>
            <form onSubmit={(event) => handleSubmit(event, assignment)}>
              <Modal.Body>
                <div className="mb-3">
                  <p>{message}</p>
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
        </div>
      )}
    </>
  );
}

export default FlashMessage;