import React, { useContext, useEffect } from 'react';
import Navbar from './components/navbar';
import Cards from './components/cards';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { STUDENT_CONTEXT_PROVIDER } from './STUDENT_STORE/STUDENT_CONTEXT';
import Assignments from './components/assignmnets';
import { ASSIGNMENT_CONTEXT_PROVIDER } from './STUDENT_STORE/ASSIGNMENT_CONTEXT';
import USER_CONTEXT_PROVIDER, { UserContext } from './STUDENT_STORE/USER_CONTEXT';
import Given_Assignments from './components/Given_Assignments';
import Courses from './components/courses';
import Login from './components/login';
import Footer from './components/footer';
import Signup from './components/signup';
import Due_assignment from './components/due_assignment';

function App() {
  return (
    <USER_CONTEXT_PROVIDER>
      <ASSIGNMENT_CONTEXT_PROVIDER>
        <STUDENT_CONTEXT_PROVIDER>
          <Router>
            <Navbar />
            <AppRoutes />
            {/* <Footer /> */}
          </Router>
        </STUDENT_CONTEXT_PROVIDER>
      </ASSIGNMENT_CONTEXT_PROVIDER>
    </USER_CONTEXT_PROVIDER>
  );
}

const AppRoutes = () => {
  const { Authtoken, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  useEffect(() => {

    if (Authtoken) {
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }
  })

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Cards /> : <Navigate to="/login" />} />
      <Route path="/assignmnets" element={isLoggedIn ? <Assignments /> : <Navigate to="/login" />} />
      <Route path="/courses" element={isLoggedIn ? <Courses /> : <Navigate to="/login" />} />
      <Route path="/assignment-given" element={isLoggedIn ? <Given_Assignments /> : <Navigate to="/login" />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={isLoggedIn ? <Navigate to="/" />:<Signup />} />
      <Route path="/dueass" element={isLoggedIn ? <Due_assignment/>:<Navigate to="/login" />} />

  
    </Routes>
  );
}

export default App;
