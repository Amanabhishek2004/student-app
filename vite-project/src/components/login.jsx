import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../STUDENT_STORE/USER_CONTEXT';

const Login = () => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  const { Login } = useContext(UserContext);
  const passwordRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let password = passwordRef.current.value;
    const formdata = new FormData()

    if (username && password) {
      formdata.append("Username" , username)
      formdata.append("Password" , password)
      Login(formdata);
    }
  };

  // useEffect(() => {
  //   const SPECIAL_CHAR = ["@", "#", "%", "^", "$"];
  //   if (username) {
  //     if (!SPECIAL_CHAR.some(char => username.includes(char))) {
  //       setError("Username must contain special characters");
  //     } else {
  //       setError(null);
  //     }
  //   }
  // }, [username]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-cont'>
        <div className="input-group has-validation">
          <span className="input-group-text">@</span>
          <div className="form-floating is-invalid">
            <input 
              type="text" 
              className="form-control is-invalid" 
              id="floatingInputGroup2" 
              placeholder="Username" 
              required 
              onChange={(event) => setUsername(event.target.value)} 
            />
            <label htmlFor="floatingInputGroup2">Username</label>
          </div>
          <div className="invalid-feedback">
            {error}
          </div>
        </div>
        <br />
        <br />
        <div className="input-group has-validation">
          <span className="input-group-text">@</span>
          <div className="form-floating is-invalid">
            <input 
              type="password" 
              className="form-control is-invalid" 
              id="floatingInputGroup2_" 
              placeholder="Password" 
              required 
              ref={passwordRef} 
            />
            <label htmlFor="floatingInputGroup2_">Password</label>
          </div>
        </div>
      </div>
      <button className='login-submit btn btn-outline-primary' type="submit">Submit</button>
    </form>
  );
};

export default Login;