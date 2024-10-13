import React, { useContext, useEffect, useRef, useState } from 'react';
import { Student_context } from '../STUDENT_STORE/STUDENT_CONTEXT';
import Login from './login';
import { UserContext } from '../STUDENT_STORE/USER_CONTEXT';

const Signup = ({setpath}) => {
  const passwordref = useRef(null);
  const usernameref = useRef(null);
  const emailref = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const { Create_student } = useContext(Student_context);
  const {Login} = useContext(UserContext)

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: {
        username: usernameref.current.value,
        password: passwordref.current.value,
        email: emailref.current.value,
      },
      attendance_status: "GOOD",
    };
    console.log(data)  
    Create_student(data);
    const form = new FormData()
    form.append("username"  , usernameref.current.value)
    form.append("password" , passwordref.current.value)
    Login(form)
  };

  useEffect(() => {
    if (password !== passwordref.current.value) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [password]);

  return (
    <div>
      <div className="container_">
        <form className="myclass" onSubmit={(event)=>{handleOnSubmit(event)}}>
          <div className="signing">
            <b className="shadowing2">
              <i>SIGN IN!</i>
            </b>
          </div>
          <div className="shadowing input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              aria-label="Your name"
              aria-describedby="basic-addon2"
              ref={usernameref}
              required
            />
            <span className="shadowing input-group-text" id="basic-addon2">
              EX: John Doe
            </span>
          </div>
          <div className="input-group has-validation myval">
            <span className="shadowing input-group-text">@</span>
            <div className="shadowing form-floating is-invalid">
              <input
                type="text"
                className="form-control is-invalid"
                id="floatingInputGroup2"
                placeholder="Email"
                ref={emailref}
                required
              />
              <label htmlFor="floatingInputGroup2">Email Address</label>
            </div>
            <div className="invalid-feedback">Please enter a valid Email-ID.</div>
          </div>
          <div className="input-group has-validation myval">
            <span className="shadowing input-group-text">
              {/* SVG Icon */}
            </span>
            <div className="shadowing form-floating is-invalid">
              <input
                type="password"
                id="inputPassword5"
                className="shadowing form-control"
                placeholder="Password"
                ref={passwordref}
                required
              />
              <label htmlFor="floatingInputGroup2">Password</label>
            </div>
          </div>
          <br />
          <div className="input-group has-validation myval">
            <span className="shadowing input-group-text">
              {/* SVG Icon */}
            </span>
            <div className={`shadowing form-floating ${disabled ? "is-invalid" : ""}`}>
              <input
                type="password"
                id="confirmPassword"
                className="shadowing form-control"
                placeholder="Confirm Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
          </div>
          <div className="shadowing input-group mb-3">
            <button className="bgc btn-info input-group-text" type="button">
              Subjects
            </button>
            <select className="form-select" id="inputGroupSelect01">
              <option defaultValue>Choose...</option>
              <option value="1">Subject 1</option>
              <option value="2">Subject 2</option>
              <option value="3">Subject 3</option>
            </select>
          </div>
          <button
            type="submit"
            className={`txt btn btn-primary ${disabled ? "disabled" : ""}`}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Submit
          </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Sign IN</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">Do you want to save the changes?</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

