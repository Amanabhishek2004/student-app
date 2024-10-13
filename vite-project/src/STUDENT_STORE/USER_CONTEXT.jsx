import React, { createContext, useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'


const DUMMY_USER = {
  USERNAME: "aman",
  STAFF_STATUS: false,
  ID: 1
};

export const UserContext = createContext({
  isLoggedIn: false,
  loginUser: null,
  Login: () => { },
  Logout: () => { },
  Authtoken: null,
});

const USER_CONTEXT_PROVIDER = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const [Authtoken, setAuthtoken] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    const token_data = localStorage.getItem("tokens")
    if (storedUser && token_data) {
      const parsedUser = JSON.parse(storedUser);
      const tokens = JSON.parse(token_data)
      setAuthtoken(tokens.access)
      setLoginUser(parsedUser);
      if (parsedUser.user_id) {
        setIsLoggedIn(true)
      }

    }
  }, [setAuthtoken, Authtoken, isLoggedIn, setIsLoggedIn]);

  const Login = (formdata) => {
    console.log(formdata);
    const url = "http://127.0.0.1:8000/api/token/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  // Ensure Content-Type is set to application/json
      },
      body: JSON.stringify({
        username: formdata.get("username"),
        password: formdata.get("password")
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data) {
          // console.log(data)
          setAuthtoken(data.access)
          let decodedData = jwtDecode(data.access); // Use a different variable name
          setLoginUser(decodedData);

          setIsLoggedIn(true);
          localStorage.setItem("current_user", JSON.stringify(decodedData));
          localStorage.setItem("tokens", JSON.stringify(data))
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  const Logout = () => {
    localStorage.removeItem("current_user")
    localStorage.removeItem("tokens")
    setIsLoggedIn(false)
  }

  return (
    <UserContext.Provider value={{ loginUser, Login, Logout, isLoggedIn, Authtoken, setIsLoggedIn, setAuthtoken, setLoginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default USER_CONTEXT_PROVIDER;



