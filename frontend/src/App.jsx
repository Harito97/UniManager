import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Dashboard from "./components/Student/Dashboard";
import Calendar from "./components/Student/Calendar";
import NotFound from "./pages/404";
import Register from "./components/Student/Register";
import Exam from "./components/Student/Exam";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {token !== null ? (
            <Route path="/student/" element={<Student />}>
              <Route exact path="/student/" element={<Dashboard />} />
              <Route exact path="/student/dashboard" element={<Dashboard />} />
              <Route exact path="/student/calendar" element={<Calendar />} />
              <Route exact path="/student/register" element={<Register />} />
              <Route exact path="/student/exam" element={<Exam />} />
            </Route>
          ) : (
            <>
              <Route exact path="*" element={<NotFound />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
