import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Admin from "./pages/Admin";
import Dashboard from "./components/Student/Dashboard";
import MyCalendar from "./components/Student/MyCalendar";
import NotFound from "./pages/404";
import Register from "./components/Student/Register";
import Exam from "./components/Student/Exam";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState(null);
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  axios
    .get("http://localhost:8000/")
    .then((res) => {
      if (res.data.Status) {
        setUser(res.data.decoded.username);
        setLevel(res.data.decoded.access_level);
        setLoading(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {level === "SV" ? (
            <Route path="/student/" element={<Student />}>
              <Route exact path="/student/" element={<Dashboard />} />
              <Route exact path="/student/dashboard" element={<Dashboard />} />
              <Route exact path="/student/calendar" element={<MyCalendar />} />
              <Route exact path="/student/register" element={<Register />} />
              <Route exact path="/student/exam" element={<Exam />} />
            </Route>
          ) : (
            <Route exact path="*" element={<NotFound />} />
          )}
          {level === "GV" ? (
            <Route path="/teacher/" element={<Teacher />}></Route>
          ) : (
            <Route exact path="*" element={<NotFound />} />
          )}
          {level === "AD" ? (
            <Route path="/admin/" element={<Admin />}></Route>
          ) : (
            <Route exact path="*" element={<NotFound />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
