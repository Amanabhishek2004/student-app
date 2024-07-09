import React, { createContext, useEffect, useState } from 'react';
import { Form } from 'react-router-dom';

const DUMMY_USER = {
  USERNAME: "AMAN",
  STAFF_STATUS: false,
  ID: 1
};

export const UserContext = createContext({
  isLoggedIn: false,
  loginUser: null,
  Login: () => {}
});

const USER_CONTEXT_PROVIDER = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLoginUser(parsedUser);
      let formdata = new FormData()
      formdata.append("Username" , parsedUser.USERNAME)
      formdata.append("Password" , "Aman@2004")
      Login(formdata)
      setIsLoggedIn(true);
    }
  }, []);

  const Login = (formdata) => {
    console.log(formdata);
    const url = "http://127.0.0.1:8000/api/login/";
    
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  // Ensure Content-Type is set to application/json
      },
      body: JSON.stringify({
        Username: formdata.get("Username"),
        Password: formdata.get("Password")
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setLoginUser(data);
      if (data) {
        setIsLoggedIn(true);
        localStorage.setItem("current_user", JSON.stringify(data));
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  



  return (
    <UserContext.Provider value={{ loginUser, Login, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default USER_CONTEXT_PROVIDER;



