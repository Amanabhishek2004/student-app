import React, { useContext, useEffect, useState } from 'react';
import { Student_context } from '../STUDENT_STORE/STUDENT_CONTEXT';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../STUDENT_STORE/USER_CONTEXT';
import { Assignment_context } from '../STUDENT_STORE/ASSIGNMENT_CONTEXT';
import Due_assignment from './due_assignment';


const Navbar = () => {
  let { message, setmessage , students ,setStudents } = useContext(Student_context);
  let currentpath = useLocation();
  let [path, setpath] = useState(null);

  let [dropdown, setdropdown] = useState(true);
  const { loginUser  , isLoggedIn , Logout} = useContext(UserContext);
  const { unread_message, assignments_given, setAssignments_given, setunread_message } = useContext(Assignment_context);
  const [param , setparam] = useState()
  useEffect(() => {
    if (loginUser) {
      fetch('http://127.0.0.1:8000/api/given_assignments',{

      })
        .then(response => response.json())
        .then(data => {
          
          setAssignments_given(data);
          let data_seen;
          if (loginUser.USERNAME) {
            const usernameKey = loginUser.USERNAME + "_";
            if (localStorage.getItem(usernameKey)) {
              data_seen = JSON.parse(localStorage.getItem(usernameKey));
              setunread_message(data.length - data_seen.seen);
            
            } else {
              data_seen = { seen: 0 };
              localStorage.setItem(usernameKey, JSON.stringify(data_seen));
              setunread_message(data.length);
            }
            console.log("msg:",unread_message)
          }
        })
        .catch(error => console.error('Error:', error));


        
    }
   

  }, [loginUser, setAssignments_given, setunread_message]); 
  

  useEffect(() => {
    setpath(currentpath.pathname);
  }, [currentpath.pathname]);

  useEffect(() => {
    if (path === "/") {
      setmessage("From here you can view all the students");
    } else if (path === "/assignments/") {
      setmessage("From here you can view assignments");
    } else if (path === "/assignment-given/") {
      setdropdown(true);
    } else {
      setdropdown(false); // Ensure dropdown is false for other paths
    }
  }, [path, setmessage]);

  const HandleOnclick = () => {
    let data = JSON.parse(localStorage.getItem(loginUser.USERNAME + "_"));
    data.seen = assignments_given.length;
    localStorage.setItem(loginUser.USERNAME + "_", JSON.stringify(data));
    setunread_message(0);
  };

 
    const handleOnChange = (query) => {
      if (query && students) {
        const filteredStudents = students.filter((student) =>
          student.name.username.startsWith(query)
        );
        setStudents(filteredStudents); // Update state immutably
      }
    };

     // Call the function with param


  return (
    path !== "/signup" ? (
      <div className='bg-dark'>
       <nav className="bg-dark navbar navbar-expand-lg">
          <div className="bg-dark container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item" key="home">
                </li>
                <li className="nav-item" key="link" style={{
                  "marginTop":"0.5rem"
                }}>
                  <Link to="/dueass">
                  Due Assignments
                  </Link>
                </li>
                <li className="nav-item dropdown" key="dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
              
                  </a>
                </li>
                <li className="nav-item" key="disabled">
                  <a className="nav-link disabled" aria-disabled = {!isLoggedIn} onClick={() => Logout()} >{isLoggedIn ? "logout" : ""}</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  onChange={(event) =>{
                  handleOnChange(event.target.value)
                }}/>
                <button className="btn btn-outline-success" type="submit" >Search</button>
              </form>
            </div>
          </div>
        </nav>

        <div className="alert alert-primary" role="alert">
          {message} <a href="#" className="alert-link">{loginUser ? loginUser.USERNAME : ""}</a>

          <Link to="/assignment-given/">
            <button
              type="button"
              className="btn btn-success position-relative"
              style={{ marginLeft: "65rem" }}
              onClick={HandleOnclick}
            >
              PROFILE

              {unread_message > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {unread_message}
                  <span className="visually-hidden">unread messages</span>
                </span>
              )}
            </button>
          </Link>

        </div>
      </div>
    ) : null
  );
};

export default Navbar;

